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
} from "@reactflow/core";
import { FC, PropsWithChildren, useMemo } from "react";
import {
    ReactFlowBoundaryNode,
    ReactFlowElementNode,
    ReactFlowDeploymentNode
} from "./Nodes";
import { ReactFlowBezierEdge } from "./Edges";

export const WorkspaceRenderer: FC<PropsWithChildren<{
    nodes: any[];
    edges: any[];
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onNodeDragStop?: NodeDragHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const NodeTypes = useMemo(() => ({
        boundary: ReactFlowBoundaryNode,
        element: ReactFlowElementNode,
        deploymentNode: ReactFlowDeploymentNode,
    }), []);
    
    const EdgeTypes = useMemo(() => ({
        relationship: ReactFlowBezierEdge,
        straight: ReactFlowBezierEdge,
        step: ReactFlowBezierEdge,
        smoothstep: ReactFlowBezierEdge,
        simplebezier: ReactFlowBezierEdge
    }), []);

    const FitViewOptions = useMemo(() => ({
        padding: 0.2,
        duration: 500,
        maxZoom: 5,
        minZoom: 0.1
    }), []);

    return (
        <ReactFlow
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={FitViewOptions}
            nodeTypes={NodeTypes}
            nodes={nodes}
            edgeTypes={EdgeTypes}
            edges={edges}
            proOptions={{ hideAttribution: true }}
            snapGrid={[40, 40]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={onNodeDragStop}
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