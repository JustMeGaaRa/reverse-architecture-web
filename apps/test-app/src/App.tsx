import {
    createDefaultSystemLandscapeView,
    createDefaultWorkspace,
    IViewDefinitionMetadata,
    IWorkspaceSnapshot,
    SystemLandscapeViewStrategy,
    ViewType
} from "@structurizr/dsl";
import { parseWorkspace } from "@structurizr/parser";
import { GraphBuilder, GraphElementVisitor, GraphvizLayoutStrategy } from "@structurizr/graphviz-layout";
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

export function App() {
    const { currentView, setCurrentView } = useWorkspaceNavigation();
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
    }, [setCurrentView]);

    useEffect(() => {
        if (workspace.views.systemLandscape) {
            const viewStrategy = new SystemLandscapeViewStrategy(workspace.model, workspace.views.systemLandscape);
            const reactFlowBuilder = new GraphBuilder();
            const reactFlowVisitor = new GraphElementVisitor(reactFlowBuilder);
            viewStrategy?.accept(reactFlowVisitor);
            const reactFlowObject = reactFlowBuilder.build();
            
            const layoutStrategy = new GraphvizLayoutStrategy();
            layoutStrategy
                .execute(reactFlowObject)
                .then(reactFlowAuto => {
                    setSystemLandScapeViewMetadata(metadata => ({
                        ...metadata,
                        elements: reactFlowAuto.nodes.reduce((elements, node) => ({
                            ...elements,
                            [node.id]: {
                                x: node.x,
                                y: node.y,
                                height: node.height,
                                width: node.width,
                            }
                        }), {}),
                    }))
                })
        }
    }, [workspace, setSystemLandScapeViewMetadata]);

    const defaultThemeUrl = "https://static.structurizr.com/themes/default/theme.json";
    const awsThemeUrl = "https://static.structurizr.com/themes/amazon-web-services-2023.01.31/theme.json";

    return (
        <div
            id={"structurizr-page"}
            style={{
                position: "relative",
                margin: "0px",
                padding: "0px",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
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
                            {/* <Themes urls={[defaultThemeUrl, awsThemeUrl]} /> */}
                    
                            <Breadcrumbs />
                            <ViewSwitcher />
                            <Zoom />

                        </Viewport>
                    </ViewportProvider>
                </ThemeProvider>
            </WorkspaceProvider>
        </div>
    );
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