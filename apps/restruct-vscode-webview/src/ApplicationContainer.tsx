import { Box } from "@chakra-ui/react";
import {
    BreadcrumbsNavigation,
    ViewSwitcherToggle,
    WorkspacePanel,
    ZoomToolbar
} from "@restruct/structurizr-controls";
import {
    EventName,
    TextEditorEvent
} from "@restruct/vscode-communication";
import {
    createDefaultWorkspace,
    IViewDefinitionMetadata,
    IWorkspaceSnapshot,
    ViewType
} from "@structurizr/dsl";
import {
    AutoLayout,
    ComponentView,
    ContainerView,
    DeploymentView,
    IViewMetadata,
    ModelView,
    Styles,
    SystemContextView,
    SystemLandscapeView,
    ThemeProvider,
    Themes,
    useWorkspaceNavigation,
    Viewport,
    ViewportProvider,
    WorkspaceProvider
} from "@structurizr/react";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useRef,
    useState
} from "react";
import { createPortal } from "react-dom";
import { Subscribable } from "rxjs";
import { createExtensionEventObservable } from "./createExtensionEventObservable";

function transformMetadata(metadata?: IViewDefinitionMetadata): IViewMetadata {
    return {
        key: metadata?.key,
        elements: metadata?.elements
            ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
        relationships: metadata?.relationships
            ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
    };
}

export const ApplicationContainer: FC<PropsWithChildren> = ({ children }) => {
    const eventObservable = useRef<Subscribable<TextEditorEvent>>();
    // const [ workspaceCst, setWorkspaceCst ] = useState<WorkspaceCstNode>();
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>(createDefaultWorkspace());
    const [ metadata, setMetadata ] = useState<{
        views: {
            systemLandscape?: IViewMetadata,
            systemContexts?: IViewMetadata[],
            containers?: IViewMetadata[],
            components?: IViewMetadata[],
            deployments?: IViewMetadata[],
        }
    }>();
    const { currentView, setCurrentView } = useWorkspaceNavigation();

    const defaultThemeUrl = "https://static.structurizr.com/themes/default/theme.json";
    const restructThemeUrl = "https://static.restruct.io/themes/default/theme.json";

    useEffect(() => {
        eventObservable.current = createExtensionEventObservable();
        const subscription = eventObservable.current.subscribe({
            next: (event) => {
                if (event.type === EventName.EDITOR_WORKSPACE_CHANGED) {
                    setWorkspace(event.workspace);
                    setCurrentView(event.workspace.views.systemLandscape);
                }
                if (event.type === EventName.WORKSPACE_LAYOUT_COMPUTED) {
                    setMetadata(metadata => ({
                        ...metadata,
                        views: {
                            ...metadata.views,
                            systemLandscape: transformMetadata(event.metadata)
                        }
                    }));
                }
            },
            error: (error) => {
                console.debug("Error while parsing the structurizr", error);
            },
            complete: () => {
                console.debug("TextEditorDocumentChangedHandler completed");
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [setCurrentView]);

    return (
        <Box
            id={"structurizr-page"}
            position={"relative"}
            margin={0}
            padding={0}
            backgroundColor={"gray.100"}
            height={"100vh"}
            width={"100vw"}
            overflow={"hidden"}
        >
            <WorkspaceProvider workspace={workspace} setWorkspace={setWorkspace}>
                <ThemeProvider>
                    <ViewportProvider>
                        <Viewport>
                            {currentView?.type === ViewType.Model && (
                                <ModelView>
                                    <AutoLayout value={{}} />
                                </ModelView>
                            )}

                            {currentView?.type === ViewType.SystemLandscape && (
                                <SystemLandscapeView
                                    value={{ key: currentView?.key }}  
                                    metadata={metadata?.views?.systemLandscape}
                                >
                                    <AutoLayout value={{}} />
                                </SystemLandscapeView>
                            )}

                            {currentView?.type === ViewType.SystemContext && (
                                <SystemContextView
                                    key={currentView.key}
                                    value={{
                                        key: currentView.key,
                                        softwareSystemIdentifier: currentView.softwareSystemIdentifier,
                                    }}
                                    metadata={metadata?.views?.systemContexts?.find(x => x.key === currentView.key)}
                                >
                                    <AutoLayout value={{}} />
                                </SystemContextView>
                            )}

                            {currentView?.type === ViewType.Container && (
                                <ContainerView
                                    key={currentView.key}
                                    value={{
                                        key: currentView.key,
                                        softwareSystemIdentifier: currentView.softwareSystemIdentifier,
                                    }}
                                    metadata={metadata?.views?.containers?.find(x => x.key === currentView.key)}
                                >
                                    <AutoLayout value={{}} />
                                </ContainerView>
                            )}
                            
                            {currentView?.type === ViewType.Component && (
                                <ComponentView
                                    key={currentView.key}
                                    value={{
                                        key: currentView.key,
                                        containerIdentifier: currentView.containerIdentifier,
                                    }}
                                    metadata={metadata?.views?.components?.find(x => x.key === currentView.key)}
                                >
                                    <AutoLayout value={{}} />
                                </ComponentView>
                            )}
                                
                            {currentView?.type === ViewType.Deployment && (
                                <DeploymentView
                                    key={currentView.key}
                                    value={{
                                        key: currentView.key,
                                        softwareSystemIdentifier: currentView.softwareSystemIdentifier,
                                        environment: currentView.environment,
                                    }}
                                    metadata={metadata?.views?.deployments?.find(x => x.key === currentView.key)}
                                >
                                    <AutoLayout value={{}} />
                                </DeploymentView>
                            )}

                            <Styles value={{ elements: [], relationships: [] }} />
                            <Themes urls={[defaultThemeUrl]} />
                    
                            <Breadcrumbs />
                            <ViewSwitcher />
                            <Zoom />

                        </Viewport>
                    </ViewportProvider>
                </ThemeProvider>
            </WorkspaceProvider>
        </Box>
    )
}

function Breadcrumbs() {
    if (document.getElementById("structurizr-page") === null) return null;
    return createPortal((
        <WorkspacePanel placement={"top-left"}>
            <BreadcrumbsNavigation />
        </WorkspacePanel>
    ), document.getElementById("structurizr-page") as HTMLElement);
}

function ViewSwitcher() {
    if (document.getElementById("structurizr-page") === null) return null;
    return createPortal((
        <WorkspacePanel placement={"top-right"}>
            <ViewSwitcherToggle />
        </WorkspacePanel>
    ), document.getElementById("structurizr-page") as HTMLElement);
}

function Zoom() {
    if (document.getElementById("structurizr-page") === null) return null;
    return createPortal((
        <WorkspacePanel placement={"bottom-right"}>
            <ZoomToolbar />
        </WorkspacePanel>
    ), document.getElementById("structurizr-page") as HTMLElement);
}
