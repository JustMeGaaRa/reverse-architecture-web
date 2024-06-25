import {
    ComponentViewStrategy,
    ContainerViewStrategy,
    createDefaultSystemLandscapeView,
    createDefaultWorkspace,
    DeploymentViewStrategy,
    IElement,
    IViewDefinitionMetadata,
    IWorkspaceSnapshot,
    ModelViewStrategy,
    SystemContextViewStrategy,
    SystemLandscapeViewStrategy,
    ViewType
} from "@structurizr/dsl";
import { parseWorkspace } from "@structurizr/parser";
import { GraphBuilder, GraphElementVisitor, GraphvizLayoutStrategy, Vertex } from "@structurizr/graphviz-layout";
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
    useWorkspace,
    useViewNavigation,
    Viewport,
    ViewportProvider,
    Workspace,
    WorkspaceProvider
} from "@structurizr/react";
import {
    BreadcrumbsNavigation,
    ViewSwitcherToggle,
    WorkspacePanel,
    ZoomToolbar
} from "@restruct/structurizr-controls";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

export function App() {
    const { currentView, setCurrentView } = useViewNavigation();
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

    useEffect(() => {
        const fetchWorkspace = async () => {
            const url = "https://raw.githubusercontent.com//JustMeGaaRa/reverse-architecture-community/main/workspaces/big-bank-plc/workspace.dsl";
            const response = await fetch(url);
            const structurizr = await response.text();
            return structurizr;
        }

        const fetchMetadata = async () => {
            const url = "https://raw.githubusercontent.com/JustMeGaaRa/reverse-architecture-community/main/workspaces/big-bank-plc/workspace.metadata.json";
            const response = await fetch(url);
            const metadata = await response.json();
            return metadata;
        }

        const initializeWorkspace = (workspace: IWorkspaceSnapshot) => {
            const view = workspace.views.systemLandscape
                ?? createDefaultSystemLandscapeView();
            setWorkspace(workspace);
            setCurrentView(view);
        }
        
        fetchWorkspace()
            .then(structurizr => {
                parseWorkspace(
                    structurizr,
                    (error) => console.debug(error),
                    (workspace) => initializeWorkspace(workspace)
                );
            })
            .catch(error => {
                console.debug(error);
            });

        fetchMetadata()
            .then(metadata => {
                setMetadata({
                    views: {
                        model: transformMetadata(metadata?.views?.model),
                        systemLandscape: transformMetadata(metadata?.views?.systemLandscape),
                        systemContexts: metadata?.views?.systemContexts.map(transformMetadata),
                        containers: metadata?.views?.containers.map(transformMetadata),
                        components: metadata?.views?.components.map(transformMetadata),
                        deployments: metadata?.views?.deployments.map(transformMetadata),
                    }
                });
            })
            .catch(error => {
                console.debug(error);
            });
    }, [setCurrentView, setMetadata]);

    const { zoomIntoElement, zoomOutOfElement } = useViewNavigation();

    const handleOnZoomInClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, element: IElement) => {
        zoomIntoElement(workspace, element);
    }, [workspace, zoomIntoElement]);

    const handleOnZoomOutClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, element: IElement) => {
        zoomOutOfElement(workspace, element);
    }, [workspace, zoomOutOfElement]);

    useEffect(() => {
        const reactFlowBuilder = new GraphBuilder();
        const reactFlowVisitor = new GraphElementVisitor(reactFlowBuilder);
        const layoutStrategy = new GraphvizLayoutStrategy();

        const reduceNodes = (nodes: Vertex[]) => {
            return nodes.reduce((elements, node) => ({
                ...elements,
                [node.id]: {
                    x: node.x,
                    y: node.y,
                    height: node.height,
                    width: node.width,
                }
            }), {});
        }

        switch (currentView?.type) {
            case ViewType.Model:
                const viewStrategy = new ModelViewStrategy(workspace);
                viewStrategy?.accept(reactFlowVisitor);
                layoutStrategy
                    .execute(reactFlowBuilder.build())
                    .then(reactFlowAuto => {
                        setModelViewMetadata(metadata => ({
                            ...metadata,
                            elements: reduceNodes(reactFlowAuto.nodes),
                        }));
                    });
                break;
            case ViewType.SystemLandscape:
                if (workspace.views.systemLandscape) {
                    const viewStrategy = new SystemLandscapeViewStrategy(workspace.model, workspace.views.systemLandscape);
                    viewStrategy?.accept(reactFlowVisitor);
                    layoutStrategy
                        .execute(reactFlowBuilder.build())
                        .then(reactFlowAuto => {
                            setSystemLandScapeViewMetadata(metadata => ({
                                ...metadata,
                                elements: reduceNodes(reactFlowAuto.nodes),
                            }))
                        });
                }
                break;
            case ViewType.SystemContext:
                const systemContext = workspace.views.systemContexts.find(x => x.key === currentView.key);
                if (systemContext) {
                    const viewStrategy = new SystemContextViewStrategy(workspace.model, systemContext);
                    viewStrategy?.accept(reactFlowVisitor);
                    layoutStrategy
                        .execute(reactFlowBuilder.build())
                        .then(reactFlowAuto => {
                            setSystemContextViewMetadata(metadata => {
                                return metadata.map(view => view.key === systemContext.key
                                    ? { ...view, elements: reduceNodes(reactFlowAuto.nodes) }
                                    : view
                                );
                            });
                        });
                }
                break;
            case ViewType.Container:
                const container = workspace.views.containers.find(x => x.key === currentView.key);
                if (container) {
                    const viewStrategy = new ContainerViewStrategy(workspace.model, container);
                    viewStrategy?.accept(reactFlowVisitor);
                    layoutStrategy
                        .execute(reactFlowBuilder.build())
                        .then(reactFlowAuto => {
                            setContainerViewMetadata(metadata => {
                                return metadata.map(view => view.key === container.key
                                    ? { ...view, elements: reduceNodes(reactFlowAuto.nodes) }
                                    : view
                                );
                            });
                        });
                }
                break;
            case ViewType.Component:
                const component = workspace.views.components.find(x => x.key === currentView.key);
                if (component) {
                    const viewStrategy = new ComponentViewStrategy(workspace.model, component);
                    viewStrategy?.accept(reactFlowVisitor);
                    layoutStrategy
                        .execute(reactFlowBuilder.build())
                        .then(reactFlowAuto => {
                            setComponentViewMetadata(metadata => {
                                return metadata.map(view => view.key === component.key
                                    ? { ...view, elements: reduceNodes(reactFlowAuto.nodes) }
                                    : view
                                );
                            });
                        });
                }
                break;
            case ViewType.Deployment:
                const deployment = workspace.views.deployments.find(x => x.key === currentView.key);
                if (deployment) {
                    const viewStrategy = new DeploymentViewStrategy(workspace.model, deployment);
                    viewStrategy?.accept(reactFlowVisitor);
                    layoutStrategy
                        .execute(reactFlowBuilder.build())
                        .then(reactFlowAuto => {
                            setDeploymentViewMetadata(metadata => {
                                return metadata.map(view => view.key === deployment.key
                                    ? { ...view, elements: reduceNodes(reactFlowAuto.nodes) }
                                    : view
                                );
                            });
                        });
                }
                break;
        }
    }, [workspace, currentView, setSystemLandScapeViewMetadata, setContainerViewMetadata, setComponentViewMetadata, setModelViewMetadata, setSystemContextViewMetadata, setDeploymentViewMetadata]);

    const defaultThemeUrl = "https://static.structurizr.com/themes/default/theme.json";
    const awsThemeUrl = "https://static.structurizr.com/themes/amazon-web-services-2023.01.31/theme.json";

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
                            <Themes urls={[defaultThemeUrl, awsThemeUrl]} />
                    
                            <Breadcrumbs />
                            <ViewSwitcher />
                            <Zoom />

                        </Viewport>
                    </Workspace>
                </ViewportProvider>
            </ThemeProvider>
        </WorkspaceProvider>
    );
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