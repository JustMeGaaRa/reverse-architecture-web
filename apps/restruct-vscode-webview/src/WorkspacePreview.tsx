import {
    BreadcrumbsNavigation,
    ViewSwitcherToggle,
    WorkspacePanel,
    ZoomToolbar
} from "@restruct/structurizr-controls";
import {
    EventName,
    VscodeExtensionEvent
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
    useViewNavigation,
    useWorkspace,
    Viewport,
    ViewportProvider,
    Workspace,
    WorkspaceProvider
} from "@structurizr/react";
import {
    FC,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";
import { createPortal } from "react-dom";
import { Observable } from "rxjs";
import { createExtensionEventObservable } from "./utils";

const vscode = acquireVsCodeApi();

function transformMetadata(metadata?: IViewDefinitionMetadata): IViewMetadata {
    return {
        key: metadata?.key,
        elements: metadata?.elements
            ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
        relationships: metadata?.relationships
            ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
    };
}

export const WorkspacePreview: FC = () => {
    const eventObservable = useRef<Observable<VscodeExtensionEvent>>();
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
    const { currentView, setCurrentView } = useViewNavigation();

    const defaultThemeUrl = "https://static.structurizr.com/themes/default/theme.json";

    const workspaceParsedHandler = useCallback((event: VscodeExtensionEvent) => {
        if (event.type === EventName.EDITOR_WORKSPACE_PARSED) {
            setWorkspace(event.workspace);
            
            if (!currentView) {
                setCurrentView(event.workspace.views.systemLandscape);
            }
        }
    }, [currentView, setCurrentView]);
    
    const workspaceLayoutComputedHandler = useCallback((event: VscodeExtensionEvent) => {
        if (event.type === EventName.EDITOR_WORKSPACE_LAYOUT_COMPUTED) {
            setMetadata(metadata => ({
                ...metadata,
                views: {
                    ...metadata?.views,
                    systemLandscape: transformMetadata(event.metadata)
                }
            }));
        }
    }, []);

    useEffect(() => {
        eventObservable.current = createExtensionEventObservable();
        const workspaceParsedSubscription = eventObservable.current.subscribe(workspaceParsedHandler);
        const workspaceLayoutSubscription = eventObservable.current.subscribe(workspaceLayoutComputedHandler);

        return () => {
            workspaceParsedSubscription.unsubscribe();
            workspaceLayoutSubscription.unsubscribe();
        }
    }, [setCurrentView, workspaceLayoutComputedHandler, workspaceParsedHandler]);
    
    useEffect(() => {
        vscode.postMessage({
            type: EventName.WORKSPACE_VIEW_CHANGED,
            view: currentView
        })
    }, [currentView]);

    return (
        <WorkspaceProvider workspace={workspace} setWorkspace={setWorkspace}>
            <ThemeProvider>
                <ViewportProvider>
                    <Workspace>
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
                    </Workspace>
                </ViewportProvider>
            </ThemeProvider>
        </WorkspaceProvider>
    )
}

function Breadcrumbs() {
    const { workspaceDomNode } = useWorkspace();

    if (!workspaceDomNode) return null;

    return createPortal((
        <WorkspacePanel placement={"top-left"}>
            <BreadcrumbsNavigation />
        </WorkspacePanel>
    ), workspaceDomNode);
}

function ViewSwitcher() {
    const { workspaceDomNode } = useWorkspace();

    if (!workspaceDomNode) return null;

    return createPortal((
        <WorkspacePanel placement={"top-right"}>
            <ViewSwitcherToggle />
        </WorkspacePanel>
    ), workspaceDomNode);
}

function Zoom() {
    const { workspaceDomNode } = useWorkspace();

    if (!workspaceDomNode) return null;

    return createPortal((
        <WorkspacePanel placement={"bottom-right"}>
            <ZoomToolbar />
        </WorkspacePanel>
    ), workspaceDomNode);
}
