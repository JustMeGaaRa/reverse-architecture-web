import "@reactflow/core/dist/style.css";

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    NodeMouseHandler,
    OnNodesChange,
    OnEdgesChange,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren
} from "react";
import { ElementNodeWrapper } from "./Nodes/ElementNode";
import { RelationshipEdgeWrapper } from "./Edges/RelationshipEdge";

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
    nodes: any[];
    edges: any[];
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodesDoubleClick
}) => {
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
            nodeTypes={NodeTypes}
            nodes={nodes}
            edgeTypes={EdgeTypes}
            edges={edges}
            proOptions={{ hideAttribution: true }}
            snapGrid={[40, 40]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={onNodesDoubleClick}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[40, 40]}
            />
            {children}
        </ReactFlow>
    );
}