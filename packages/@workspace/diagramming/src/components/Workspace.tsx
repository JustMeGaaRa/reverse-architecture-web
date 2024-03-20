import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    Connection,
    Node,
    useReactFlow,
    ReactFlowProvider,
} from "@reactflow/core";
import {
    ElementType,
    IElement,
    IWorkspaceSnapshot,
    Position
} from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { getAbsolutePoint } from "../utils";
import { ReactFlowNodeTypes } from "./Nodes";
import { ReactFlowEdgeTypes } from "./Edges";
import { ArrowClosedMarker, CircleOutlineMarker, MarkerRefs } from "./MarkerType";

export const Workspace: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    onElementClick?: (event: React.MouseEvent, element: IElement, relativePosition: Position) => void;
    onElementDragStart?: (event: React.MouseEvent, element: IElement) => void;
    onElementDrag?: (event: React.MouseEvent, element: IElement) => void;
    onElementDragStop?: (event: React.MouseEvent, element: IElement) => void;
    onElementsConnect?: (connection: Connection) => void;
    onViewClick?: (event: React.MouseEvent, relativePosition: Position) => void;
}>> = ({
    children,
    workspace,
    onElementClick,
    onElementDragStart,
    onElementDrag,
    onElementDragStop,
    onElementsConnect,
    onViewClick
}) => {
    const { setWorkspace } = useWorkspace();

    useEffect(() => setWorkspace(workspace), [workspace, setWorkspace]);

    return (
        <ReactFlowProvider>
            <WorkspaceReactFlowWrapper
                onElementClick={onElementClick}
                onElementDragStart={onElementDragStart}
                onElementDrag={onElementDrag}
                onElementDragStop={onElementDragStop}
                onElementsConnect={onElementsConnect}
                onViewClick={onViewClick}
            >
                {children}
            </WorkspaceReactFlowWrapper>
        </ReactFlowProvider>
    )
}

export const WorkspaceReactFlowWrapper: FC<PropsWithChildren<{
    onElementClick?: (event: React.MouseEvent, element: IElement, relativePosition: Position) => void;
    onElementDragStart?: (event: React.MouseEvent, element: IElement) => void;
    onElementDrag?: (event: React.MouseEvent, element: IElement) => void;
    onElementDragStop?: (event: React.MouseEvent, element: IElement) => void;
    onElementsConnect?: (connection: Connection) => void;
    onViewClick?: (event: React.MouseEvent, relativePosition: Position) => void;
}>> = ({
    children,
    onElementClick,
    onElementDragStart,
    onElementDrag,
    onElementDragStop,
    onElementsConnect,
    onViewClick
}) => {
    const { getViewport } = useReactFlow();
    const reactFlowRef = useRef(null);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (reactFlowRef.current) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY };
            const pointRelativeToViewport = {
                x: mousePoint.x - parentOffset.left,
                y: mousePoint.y - parentOffset.top
            };
            const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);
            const pointRelativeToNode = {
                x: pointTranslatedFromViewport.x - node.positionAbsolute.x,
                y: pointTranslatedFromViewport.y - node.positionAbsolute.y
            };
            const groupId = node.data.element.type === ElementType.Group ? node.id : undefined;
            onElementClick?.(event, node.data.element, pointRelativeToNode);
        }
    }, [getViewport, onElementClick]);

    const handleOnNodeDragStart = useCallback((event: React.MouseEvent, node: Node) => {
        onElementDragStart?.(event, node.data.element);
    }, [onElementDragStart]);

    const handleOnNodeDrag = useCallback((event: React.MouseEvent, node: Node) => {
        onElementDrag?.(event, node.data.element);
    }, [onElementDrag]);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        onElementDragStop?.(event, node.data.element);
    }, [onElementDragStop]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (reactFlowRef.current) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY };
            const pointRelativeToViewport = {
                x: mousePoint.x - parentOffset.left,
                y: mousePoint.y - parentOffset.top
            };
            const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);
            onViewClick?.(event, pointTranslatedFromViewport);
        }
    }, [getViewport, onViewClick]);

    const handleOnConnect = useCallback((connection: Connection) => {
        onElementsConnect?.(connection);
    }, [onElementsConnect]);

    return (
        <ReactFlow
            ref={reactFlowRef}
            connectionMode={ConnectionMode.Loose}
            className={"workspace__renderer"}
            fitViewOptions={{
                padding: 0.3,
                maxZoom: 5,
                minZoom: 0.1
            }}
            fitView
            nodeTypes={ReactFlowNodeTypes}
            defaultNodes={[]}
            // nodesDraggable={!isReadonly}
            // nodesConnectable={!isReadonly}
            nodeDragThreshold={5}
            // edgesUpdatable={!isReadonly}
            edgeTypes={ReactFlowEdgeTypes}
            defaultEdges={[]}
            proOptions={{ hideAttribution: true }}
            snapGrid={[50, 50]}
            onNodeClick={handleOnNodeClick}
            onNodeDragStart={handleOnNodeDragStart}
            onNodeDrag={handleOnNodeDrag}
            onNodeDragStop={handleOnNodeDragStop}
            onPaneClick={handleOnPaneClick}
            onConnect={handleOnConnect}
        >
            <MarkerRefs>
                <CircleOutlineMarker />
                <ArrowClosedMarker />
            </MarkerRefs>
            <Background
                gap={50}
                size={2}
                variant={BackgroundVariant.Dots}
            />
            {children}
        </ReactFlow>
    )
}