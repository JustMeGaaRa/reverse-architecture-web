import "@reactflow/core/dist/style.css";

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    NodeMouseHandler,
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
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    nodes,
    edges,
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
}