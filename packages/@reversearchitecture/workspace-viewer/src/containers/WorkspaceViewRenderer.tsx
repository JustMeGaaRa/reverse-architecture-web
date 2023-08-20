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
    ReactFlowBezierEdge,
    CircleOutlineMarker,
    ArrowClosedMarker,
    MarkerRefs
} from "../components";

export const WorkspaceViewRenderer = forwardRef<HTMLDivElement, PropsWithChildren<{
    nodes: any[];
    edges: any[];
    onInitialize?: OnInit<any, any>;
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onNodeDragStop?: NodeDragHandler;
    onNodesDoubleClick?: NodeMouseHandler;
    onNodeClick?: NodeMouseHandler;
    onMouseMove?: MouseEventHandler<HTMLDivElement>;
    onPaneClick?: MouseEventHandler;
}>>(({
    children,
    nodes,
    edges,
    onInitialize,
    onNodesChange,
    onEdgesChange,
    onNodeDragStop,
    onNodesDoubleClick,
    onNodeClick,
    onMouseMove,
    onPaneClick
}, ref) => {
    const NodeTypes = useMemo(() => ({
        element: ReactFlowElementNode,
        boundary: ReactFlowBoundaryNode,
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
            onInit={onInitialize}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={onNodeDragStop}
            onNodeDoubleClick={onNodesDoubleClick}
            onNodeClick={onNodeClick}
            onMouseMove={onMouseMove}
            onPaneClick={onPaneClick}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[40, 40]}
            />
            <MarkerRefs>
                <CircleOutlineMarker />
                <ArrowClosedMarker />
            </MarkerRefs>
            {children}
        </ReactFlow>
    );
});

WorkspaceViewRenderer.displayName = "WorkspaceRenderer";