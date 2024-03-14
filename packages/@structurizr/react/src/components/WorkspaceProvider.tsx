import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    NodeMouseHandler,
    OnNodesChange,
    OnEdgesChange,
    NodeDragHandler,
    OnInit,
    OnConnectStart,
    OnConnectEnd,
    OnConnect,
    NodeTypes,
    EdgeTypes,
    ReactFlowProvider,
    useReactFlow,
} from "@reactflow/core";
import * as Types from "@structurizr/y-workspace";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
    ComponentContext,
    ComponentViewContext,
    ContainerContext,
    ContainerViewContext,
    DeploymentEnvironmentContext,
    DeploymentViewContext,
    GroupContext,
    ModelContext,
    PersonContext,
    RelationshipContext,
    SoftwareSystemContext,
    StylesContext,
    SystemContextViewContext,
    SystemLandscapeViewContext,
    ThemesContext,
    ViewsContext,
    WorkspaceContext
} from "../contexts";
import { ModelViewStrategy } from "@structurizr/dsl";
import { useThemes, useWorkspace } from "../hooks";

export const Workspace: FC<PropsWithChildren<{ workspace: Types.Workspace }>> = ({ children, workspace: workspaceProp }) => {
    const [ workspace, setWorkspace ] = useState<Types.Workspace>(workspaceProp);
    
    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            <ReactFlowProvider>
                <ReactFlow
                    connectionMode={ConnectionMode.Loose}
                    fitViewOptions={{
                        padding: 0.3,
                        maxZoom: 5,
                        minZoom: 0.1
                    }}
                    fitView
                    nodeTypes={{}}
                    defaultNodes={[]}
                    nodeDragThreshold={5}
                    edgeTypes={{}}
                    defaultEdges={[]}
                    proOptions={{ hideAttribution: true }}
                    snapGrid={[50, 50]}
                >
                    <Background
                        gap={50}
                        size={2}
                        variant={BackgroundVariant.Dots}
                    />
                    {children}
                </ReactFlow>
            </ReactFlowProvider>
        </WorkspaceContext.Provider>
    )
}

export const Model: FC<PropsWithChildren> = ({ children }) => {
    const { workspace } = useWorkspace();
    const { setNodes, setEdges } = useReactFlow();

    useEffect(() => {
        if (workspace) {
            const updateFlow = () => {
                const workspaceSnapshot = workspace.toSnapshot();
                console.log("model updated", workspaceSnapshot);

                const strategy = new ModelViewStrategy(workspaceSnapshot.model);
                const reactFlowAuto = { nodes: [], edges: [] };
                
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            }
    
            workspace.model.subscribe(updateFlow);
            updateFlow();
    
            return () => {
                workspace.model.unsubscribe(updateFlow);
            }
        }
    }, [workspace, setEdges, setNodes]);

    return (
        <>
            {children}
        </>
    )
}

export const Person: FC<PropsWithChildren<{ person: Types.Person }>> = ({ children }) => {
    const [ person, setPerson ] = useState<Types.Person>();
    
    return (
        <PersonContext.Provider value={{ person, setPerson }}>
            {children}
        </PersonContext.Provider>
    )
}

export const Group: FC<PropsWithChildren<{ group: Types.Group }>> = ({ children }) => {
    const [ group, setGroup ] = useState<Types.Group>();

    return (
        <GroupContext.Provider value={{ group, setGroup }}>
            {children}
        </GroupContext.Provider>
    )
}

export const SoftwareSystem: FC<PropsWithChildren<{ softwareSystem: Types.SoftwareSystem }>> = ({ children }) => {
    const [ softwareSystem, setSoftwareSystem ] = useState<Types.SoftwareSystem>();

    return (
        <SoftwareSystemContext.Provider value={{ softwareSystem, setSoftwareSystem }}>
            {children}
        </SoftwareSystemContext.Provider>
    )
}

export const Container: FC<PropsWithChildren<{ container: Types.Container }>> = ({ children }) => {
    const [ container, setContainer ] = useState<Types.Container>();
    
    return (
        <ContainerContext.Provider value={{ container, setContainer }}>
            {children}
        </ContainerContext.Provider>
    )
}

export const Component: FC<PropsWithChildren<{ component: Types.Component }>> = ({ children }) => {
    const [ component, setComponent ] = useState<Types.Component>();

    return (
        <ComponentContext.Provider value={{ component, setComponent }}>
            {children}
        </ComponentContext.Provider>
    )
}

export const DeploymentEnvironment: FC<PropsWithChildren<{ deploymentEnvironment: Types.DeploymentEnvironment }>> = ({ children }) => {
    const [ deploymentEnvironment, setDeploymentEnvironment ] = useState<Types.DeploymentEnvironment>();

    return (
        <DeploymentEnvironmentContext.Provider value={{ deploymentEnvironment, setDeploymentEnvironment }}>
            {children}
        </DeploymentEnvironmentContext.Provider>
    )
}

export const Relationship: FC<PropsWithChildren<{ relationship: Types.Relationship }>> = ({ children }) => {
    const [ relationship, setRelationship ] = useState<Types.Relationship>();

    return (
        <RelationshipContext.Provider value={{ relationship, setRelationship }}>
            {children}
        </RelationshipContext.Provider>
    )
}

export const Views: FC<PropsWithChildren> = ({ children }) => {
    const { workspace } = useWorkspace();

    useEffect(() => {
        if (workspace) {
            const updateFlow = () => {
                const workspaceSnapshot = workspace.toSnapshot();
                console.log("views updated", workspaceSnapshot);
            }
    
            workspace.views.subscribe(updateFlow);
            updateFlow();
    
            return () => {
                workspace.views.unsubscribe(updateFlow);
            }
        }
    }, [workspace]);

    return (
        <>
            {children}
        </>
    )
}

export const SystemLandscapeView: FC<PropsWithChildren<{ view: Types.SystemLandscapeView }>> = ({ children }) => {
    const [ systemLandscapeView, setSystemLandscapeView ] = useState<Types.SystemLandscapeView>();

    return (
        <SystemLandscapeViewContext.Provider value={{ systemLandscapeView, setSystemLandscapeView }}>
            {children}
        </SystemLandscapeViewContext.Provider>
    )
}

export const SystemContextView: FC<PropsWithChildren<{ view: Types.SystemContextView }>> = ({ children }) => {
    const [ systemContextView, setSystemContextView ] = useState<Types.SystemContextView>();

    return (
        <SystemContextViewContext.Provider value={{ systemContextView, setSystemContextView }}>
            {children}
        </SystemContextViewContext.Provider>
    )
}

export const ContainerView: FC<PropsWithChildren<{ view: Types.ContainerView }>> = ({ children }) => {
    const [ containerView, setContainerView ] = useState<Types.ContainerView>();

    return (
        <ContainerViewContext.Provider value={{ containerView, setContainerView }}>
            {children}
        </ContainerViewContext.Provider>
    )
}

export const ComponentView: FC<PropsWithChildren<{ view: Types.ComponentView }>> = ({ children }) => {
    const [ componentView, setComponentView ] = useState<Types.ComponentView>();

    return (
        <ComponentViewContext.Provider value={{ componentView, setComponentView }}>
            {children}
        </ComponentViewContext.Provider>
    )
}

export const DeploymentView: FC<PropsWithChildren<{ view: Types.DeploymentView }>> = ({ children }) => {
    const [ deploymentView, setDeploymentView ] = useState<Types.DeploymentView>();

    return (
        <DeploymentViewContext.Provider value={{ deploymentView, setDeploymentView }}>
            {children}
        </DeploymentViewContext.Provider>
    )
}

export const Styles: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export const ElementStyle: FC<PropsWithChildren<{ style: any }>> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export const RelationshipStyle: FC<PropsWithChildren<{ style: any }>> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export const Themes: FC<PropsWithChildren> = ({ children }) => {
    const [ themes, setThemes ] = useState<Types.Theme>();

    return (
        <ThemesContext.Provider value={{ themes, setThemes }}>
            {children}
        </ThemesContext.Provider>
    )
}

export const Theme: FC<PropsWithChildren<{ url: string }>> = ({ children, url }) => {
    const { themes, setThemes } = useThemes();

    useEffect(() => {
        // TODO: fetch theme and pass to the provider
    }, []);

    return null;
}