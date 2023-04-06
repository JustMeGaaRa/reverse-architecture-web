import "@reactflow/core/dist/style.css";

import { Workspace, buildSystemContextView } from "@justmegaara/structurizr-dsl";
import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    applyNodeChanges,
    applyEdgeChanges,
    NodeChange,
    EdgeChange,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
} from "react";
import { ElementNodeWrapper } from "./Nodes/ElementNode";
import { RelationshipEdgeWrapper } from "./Edges/RelationshipEdge";
import { fromSystemContextView } from "../utils/Workspace";

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
}>> = ({
    children,
    workspace
}) => {
    const view = workspace
        ? buildSystemContextView(workspace, workspace?.views.systemContexts[0].softwareSystemIdentifier)
        : undefined;
    const { nodes: defaultNodes, edges: defaultEdges } = fromSystemContextView(view, workspace);

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        applyNodeChanges(changes, defaultNodes);
    }, [defaultNodes]);
    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        applyEdgeChanges(changes, defaultEdges);
    }, [defaultEdges]);

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
            nodes={defaultNodes}
            edges={defaultEdges}
            edgeTypes={EdgeTypes}
            nodeTypes={NodeTypes}
            proOptions={{ hideAttribution: true }}
            snapGrid={[40, 40]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[40, 40]}
            />
            {children}
        </ReactFlow>
    );
};
