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
    IElement,
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
    SetStateAction,
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

const useViewMetadata = () => {
    const [ metadata, setMetadata ] = useState<{
        views: {
            model: IViewMetadata,
            systemLandscape?: IViewMetadata,
            systemContexts?: IViewMetadata[],
            containers?: IViewMetadata[],
            components?: IViewMetadata[],
            deployments?: IViewMetadata[],
        }
    }>();

    const setModelViewMetadata = useCallback((action: SetStateAction<IViewMetadata>) => {
        setMetadata(metadata => {
            if (!metadata?.views?.model) return metadata;

            return ({
                ...metadata,
                views: {
                    ...metadata.views,
                    model: typeof action === "function"
                        ? action(metadata.views.model)
                        : action
                }
            });
        });
    }, []);

    const setSystemLandScapeViewMetadata = useCallback((action: SetStateAction<IViewMetadata>) => {
        setMetadata(metadata => {
            if (!metadata?.views?.systemLandscape) return metadata;
            
            return ({
                ...metadata,
                views: {
                    ...metadata.views,
                    systemLandscape: typeof action === "function"
                        ? action(metadata.views.systemLandscape)
                        : action
                }
            });
        });
    }, []);

    const setSystemContextViewMetadata = useCallback((action: SetStateAction<Array<IViewMetadata>>) => {
        setMetadata(metadata => {
            if (!metadata?.views?.systemContexts) return metadata;
            
            return ({
                ...metadata,
                views: {
                    ...metadata.views,
                    systemContexts: typeof action === "function"
                        ? action(metadata.views.systemContexts)
                        : action
                }
            });
        });
    }, []);

    const setContainerViewMetadata = useCallback((action: SetStateAction<Array<IViewMetadata>>) => {
        setMetadata(metadata => {
            if (!metadata?.views?.containers) return metadata;
            
            return ({
                ...metadata,
                views: {
                    ...metadata.views,
                    containers: typeof action === "function"
                        ? action(metadata.views.containers)
                        : action
                }
            });
        });
    }, []);

    const setComponentViewMetadata = useCallback((action: SetStateAction<Array<IViewMetadata>>) => {
        setMetadata(metadata => {
            if (!metadata?.views?.components) return metadata;
            
            return ({
                ...metadata,
                views: {
                    ...metadata.views,
                    components: typeof action === "function"
                        ? action(metadata.views.components)
                        : action
                }
            });
        });
    }, []);

    const setDeploymentViewMetadata = useCallback((action: SetStateAction<Array<IViewMetadata>>) => {
        setMetadata(metadata => {
            if (!metadata?.views?.deployments) return metadata;
            
            return ({
                ...metadata,
                views: {
                    ...metadata.views,
                    deployments: typeof action === "function"
                        ? action(metadata.views.deployments)
                        : action
                }
            });
        });
    }, []);

    return {
        metadata,
        setMetadata,
        setModelViewMetadata,
        setSystemLandScapeViewMetadata,
        setSystemContextViewMetadata,
        setContainerViewMetadata,
        setComponentViewMetadata,
        setDeploymentViewMetadata
    }
}

export const WorkspacePreview: FC = () => {
    const eventObservable = useRef<Observable<VscodeExtensionEvent>>();
    // const [ workspaceCst, setWorkspaceCst ] = useState<WorkspaceCstNode>();
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>(createDefaultWorkspace());
    const {
        metadata,
        setMetadata,
        setModelViewMetadata,
        setSystemLandScapeViewMetadata,
        setSystemContextViewMetadata,
        setContainerViewMetadata,
        setComponentViewMetadata,
        setDeploymentViewMetadata
    } = useViewMetadata();
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
    }, [setMetadata]);

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

    const { zoomIntoElement, zoomOutOfElement } = useViewNavigation();

    const handleOnZoomInClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, element: IElement) => {
        zoomIntoElement(workspace, element);
    }, [workspace, zoomIntoElement]);

    const handleOnZoomOutClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, element: IElement) => {
        zoomOutOfElement(workspace, element);
    }, [workspace, zoomOutOfElement]);

    return (
        <WorkspaceProvider workspace={workspace} setWorkspace={setWorkspace}>
            <ThemeProvider>
                <ViewportProvider>
                    <Workspace>
                        <Viewport>
                            {currentView?.type === ViewType.Model && (
                                <ModelView
                                    metadata={metadata?.views?.model}
                                >
                                    <AutoLayout value={{}} />
                                </ModelView>
                            )}

                            {currentView?.type === ViewType.SystemLandscape && (
                                <SystemLandscapeView
                                    value={{ key: currentView?.key }}  
                                    metadata={metadata?.views?.systemLandscape}
                                    onZoomInClick={handleOnZoomInClick}
                                    onZoomOutClick={handleOnZoomOutClick}
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
                                    onZoomInClick={handleOnZoomInClick}
                                    onZoomOutClick={handleOnZoomOutClick}
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
                                    onZoomInClick={handleOnZoomInClick}
                                    onZoomOutClick={handleOnZoomOutClick}
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
                                    onZoomInClick={handleOnZoomInClick}
                                    onZoomOutClick={handleOnZoomOutClick}
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
                                    onZoomInClick={handleOnZoomInClick}
                                    onZoomOutClick={handleOnZoomOutClick}
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
