import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';

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
} from "@reactflow/core";
import {
    forwardRef,
    MouseEventHandler,
    PropsWithChildren,
    useMemo
} from "react";
import {
    CircleOutlineMarker,
    ArrowClosedMarker,
    MarkerRefs
} from "../components";

export const WorkspaceViewRenderer = forwardRef<HTMLDivElement, PropsWithChildren<{
    nodes: any[];
    nodeTypes: NodeTypes;
    edges: any[];
    edgeTypes: EdgeTypes;
    isReadonly?: boolean;
    onInitialize?: OnInit<any, any>;
    onNodesChange?: OnNodesChange;
    onEdgesChange?: OnEdgesChange;
    onNodeDragStop?: NodeDragHandler;
    onNodesDoubleClick?: NodeMouseHandler;
    onNodeClick?: NodeMouseHandler;
    onMouseMove?: MouseEventHandler<HTMLDivElement>;
    onPaneClick?: MouseEventHandler;
    onConnect?: OnConnect;
    onConnectStart?: OnConnectStart;
    onConnectEnd?: OnConnectEnd;
}>>(({
    children,
    nodes,
    nodeTypes,
    edges,
    edgeTypes,
    isReadonly,
    onInitialize,
    onNodesChange,
    onEdgesChange,
    onNodeDragStop,
    onNodesDoubleClick,
    onNodeClick,
    onMouseMove,
    onPaneClick,
    onConnect,
    onConnectStart,
    onConnectEnd
}, ref) => {
    const FitViewOptions = useMemo(() => ({
        padding: 0.3,
        duration: 500,
        maxZoom: 5,
        minZoom: 0.1
    }), []);

    return (
        <ReactFlow
            ref={ref}
            connectionMode={ConnectionMode.Loose}
            fitViewOptions={FitViewOptions}
            fitView
            nodeTypes={nodeTypes}
            nodes={nodes}
            nodesDraggable={!isReadonly}
            nodesConnectable={!isReadonly}
            nodeDragThreshold={5}
            edgesUpdatable={!isReadonly}
            edgeTypes={edgeTypes}
            edges={edges}
            proOptions={{ hideAttribution: true }}
            snapGrid={[50, 50]}
            onInit={onInitialize}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={onNodeDragStop}
            onNodeDoubleClick={onNodesDoubleClick}
            onNodeClick={onNodeClick}
            onMouseMove={onMouseMove}
            onPaneClick={onPaneClick}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
        >
            <MarkerRefs>
                <CircleOutlineMarker />
                <ArrowClosedMarker />
            </MarkerRefs>
            {children}
        </ReactFlow>
    );
});

WorkspaceViewRenderer.displayName = "WorkspaceRenderer";