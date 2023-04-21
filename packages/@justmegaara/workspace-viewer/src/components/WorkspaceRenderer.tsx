import "@reactflow/core/dist/style.css";

import {
    ComponentViewClient,
    ContainerViewClient,
    DeploymentViewClient,
    GenericView,
    IClient,
    SystemContextViewClient,
    SystemLandscapeViewClient,
    ViewType,
    Workspace,
    WorkspaceLayout
} from "@justmegaara/structurizr-dsl";
import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    NodeMouseHandler,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
} from "react";
import { ElementNodeWrapper } from "./Nodes/ElementNode";
import { RelationshipEdgeWrapper } from "./Edges/RelationshipEdge";
import { ReactFlowVisitor } from "../services/ReactFlowVisitor";

const NodeTypes = {
    element: ElementNodeWrapper,
    box: ElementNodeWrapper,
    cylinder: ElementNodeWrapper,
    hexagon: ElementNodeWrapper,
    person: ElementNodeWrapper,
    pipe: ElementNodeWrapper,
    roundedBox: ElementNodeWrapper
}

const EdgeTypes = {
    relationship: RelationshipEdgeWrapper,
    straight: RelationshipEdgeWrapper,
    step: RelationshipEdgeWrapper,
    smoothstep: RelationshipEdgeWrapper,
    simplebezier: RelationshipEdgeWrapper
}

export const WorkspaceRenderer: FC<PropsWithChildren<{
    workspace?: Workspace;
    workspaceLayout?: WorkspaceLayout;
    initialView?: GenericView;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    workspaceLayout,
    initialView,
    onNodesDoubleClick
}) => {
    const viewLayout = workspaceLayout[initialView.identifier];
    const viewFunctions: Map<ViewType, IClient> = new Map<ViewType, IClient>([
        [ "System Landscape", new SystemLandscapeViewClient(workspace, viewLayout)],
        [ "System Context", new SystemContextViewClient(workspace, viewLayout, initialView.identifier) ],
        [ "Container", new ContainerViewClient(workspace, viewLayout, initialView.identifier) ],
        [ "Component", new ComponentViewClient(workspace, viewLayout, initialView.identifier) ],
        [ "Deployment", new DeploymentViewClient(workspace, "REPLACE", initialView.identifier)],
    ]);

    const visitor = new ReactFlowVisitor(
        workspace,
        viewLayout,
        initialView.type,
        initialView.identifier
    );
    viewFunctions.get(initialView.type).accept(visitor);
    const { nodes, edges } = visitor.getReactFlow();

    const fitViewOptions = {
        padding: 0.2,
        duration: 500,
        maxZoom: 5,
        minZoom: 0.1
    };

    return (
        <ReactFlow
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={fitViewOptions}
            nodes={nodes}
            edges={edges}
            edgeTypes={EdgeTypes}
            nodeTypes={NodeTypes}
            proOptions={{ hideAttribution: true }}
            snapGrid={[40, 40]}
            onNodeDoubleClick={onNodesDoubleClick}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[40, 40]}
            />
            {children}
        </ReactFlow>
    );
};
