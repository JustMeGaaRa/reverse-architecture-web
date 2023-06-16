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
} from "@reactflow/core";
import { forwardRef, MouseEventHandler, PropsWithChildren, useMemo } from "react";
import {
    ReactFlowBoundaryNode,
    ReactFlowElementNode,
    ReactFlowDeploymentNode,
    ReactFlowBezierEdge
} from "../components";

export const WorkspaceRenderer = forwardRef<HTMLDivElement, PropsWithChildren<{
    nodes: any[];
    edges: any[];
    onInitialize?: OnInit<any, any>;
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onNodeDragStop?: NodeDragHandler;
    onNodesDoubleClick?: NodeMouseHandler;
    onMouseMove?: MouseEventHandler<HTMLDivElement>;
}>>(({
    children,
    nodes,
    edges,
    onInitialize,
    onNodesChange,
    onEdgesChange,
    onNodeDragStop,
    onNodesDoubleClick,
    onMouseMove
}, ref) => {
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
            ref={ref}
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={FitViewOptions}
            nodeTypes={NodeTypes}
            nodes={nodes}
            edgeTypes={EdgeTypes}
            edges={edges}
            proOptions={{ hideAttribution: true }}
            snapGrid={[40, 40]}
            style={{ position: "relative" }}
            onInit={onInitialize}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={onNodeDragStop}
            onNodeDoubleClick={onNodesDoubleClick}
            onMouseMove={onMouseMove}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[40, 40]}
            />
            {children}
        </ReactFlow>
    );
});

WorkspaceRenderer.displayName = "WorkspaceRenderer";