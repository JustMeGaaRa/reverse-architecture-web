import {
    createDefaultWorkspace,
    IWorkspaceMetadata,
    IWorkspaceSnapshot
} from "@structurizr/dsl";
import { parseWorkspace } from "@structurizr/parser";
import {
    AutoLayout,
    Styles,
    SystemLandscapeView,
    ThemeProvider,
    Themes,
    Viewport,
    ViewportProvider,
    WorkspaceProvider
} from "@structurizr/svg";
import {
    ViewSwitcherToggle,
    ZoomToolbar
} from "@structurizr-preview/controls";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function App() {
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>(createDefaultWorkspace());
    const [ metadata, setMetadata ] = useState<IWorkspaceMetadata>();

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
        
        fetchWorkspace()
            .then(structurizr => {
                parseWorkspace(
                    structurizr,
                    (error) => console.debug(error),
                    (workspace) => setWorkspace(workspace)
                );
            })
            .catch(error => {
                console.debug(error);
            });

        fetchMetadata()
            .then(metadata => {
                setMetadata(metadata);
            })
            .catch(error => {
                console.debug(error);
            });
    }, []);

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
            }}
        >
            <WorkspaceProvider workspace={workspace} setWorkspace={setWorkspace}>
                <ThemeProvider>
                    <ViewportProvider>
                        <Viewport>
                            {workspace.views.systemLandscape && (
                                // <Box position={{ x: 0, y: -1400 }}>
                                    <SystemLandscapeView
                                        value={{ key: workspace.views.systemLandscape.key }}
                                        metadata={{
                                            elements: metadata?.views?.systemLandscape?.elements
                                                ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
                                            relationships: metadata?.views?.systemLandscape?.relationships
                                                ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
                                        }}
                                    >
                                        <AutoLayout value={{}} />
                                    </SystemLandscapeView>
                                // </Box>
                            )}

                            {/* {workspace.views.systemContexts.map((systemContext, index) => (
                                <Box position={{ x: index * 500, y: 0 }}>
                                    <SystemContextView
                                        key={systemContext.key}
                                        value={{
                                            key: systemContext.key,
                                            softwareSystemIdentifier: systemContext.softwareSystemIdentifier,
                                        }}
                                        metadata={{
                                            elements: metadata?.views?.systemContexts[index]?.elements
                                                ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
                                            relationships: metadata?.views?.systemContexts[index]?.relationships
                                                ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
                                        }}
                                    >
                                        <AutoLayout value={{}} />
                                    </SystemContextView>
                                </Box>
                            ))} */}

                            {/* {workspace.views.containers.map((container, index) => (
                                <Box position={{ x: index * 500, y: 1000 }}>
                                    <ContainerView
                                        key={container.key}
                                        value={{
                                            key: container.key,
                                            softwareSystemIdentifier: container.softwareSystemIdentifier,
                                        }}
                                        metadata={{
                                            elements: metadata?.views?.containers[index]?.elements
                                                ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
                                            relationships: metadata?.views?.containers[index]?.relationships
                                                ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
                                        }}
                                    >
                                        <AutoLayout value={{}} />
                                    </ContainerView>
                                </Box>
                            ))} */}
                            
                            {/* {workspace.views.components.map((component, index) => (
                                <g transform={`translate(${index * 500}, 2000)`}>
                                    <ComponentView
                                        key={component.key}
                                        value={{
                                            key: component.key,
                                            containerIdentifier: component.containerIdentifier,
                                        }}
                                        metadata={{
                                            elements: metadata?.views?.components[index]?.elements
                                                ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
                                            relationships: metadata?.views?.components[index]?.relationships
                                                ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
                                        }}
                                    >
                                        <AutoLayout value={{}} />
                                    </ComponentView>
                                </g>
                            ))} */}
                                
                            {/* {workspace.views.deployments.map((deployment, index) => (
                                <g transform={`translate(${index * 500}, 3000)`}>
                                    <DeploymentView
                                        key={deployment.key}
                                        value={{
                                            key: deployment.key,
                                            softwareSystemIdentifier: deployment.softwareSystemIdentifier,
                                            environment: deployment.environment,
                                        }}
                                        metadata={{
                                            elements: metadata?.views?.deployments[index]?.elements
                                                ?.reduce((acc, element) => ({ ...acc, [element.id]: element }), {}) ?? {},
                                            relationships: metadata?.views?.deployments[index]?.relationships
                                                ?.reduce((acc, relationship) => ({ ...acc, [relationship.id]: relationship }), {}) ?? {}
                                        }}
                                    >
                                        <AutoLayout value={{}} />
                                    </DeploymentView>
                                </g>
                            ))} */}

                            <Styles value={{ elements: [], relationships: [] }} />
                            <Themes urls={[defaultThemeUrl, awsThemeUrl]} />
                    
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
    return createPortal((
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    height: "auto",
                    width: "auto",
                    margin: "16px",
                    overflow: "hidden",
                }}
            >
            </div>
        ),
        document.body as HTMLElement
    );
}

function ViewSwitcher() {
    return createPortal((
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    height: "auto",
                    width: "auto",
                    margin: "16px",
                    overflow: "hidden",
                }}
            >
                <ViewSwitcherToggle />
            </div>
        ),
        document.body as HTMLElement
    );
}

function Zoom() {
    return createPortal((
            <div
                style={{
                    position: "absolute",
                    bottom: "0px",
                    right: "0px",
                    height: "auto",
                    width: "auto",
                    margin: "16px",
                    overflow: "hidden",
                }}
            >
                <ZoomToolbar />
            </div>
        ),
        document.body as HTMLElement
    );
}