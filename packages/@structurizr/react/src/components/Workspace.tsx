import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';

import { Background, BackgroundVariant } from "@reactflow/background";
import { Connection, ConnectionMode, Node, ReactFlow, ReactFlowProvider, useReactFlow } from "@reactflow/core";
import { ElementType, IElement, IRelationship, IWorkspaceSnapshot, Position, RelationshipType } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { getAbsolutePoint } from "../utils";
import { MarkerArrowClosed, MarkerCircleOutline, MarkerRefs } from "./Edges";
import { ReactFlowEdgeTypes, ReactFlowNodeTypes } from "./ReactFlow";
import { useWorkspace } from "../hooks";

export const Workspace: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    onElementClick?: (event: React.MouseEvent, element: IElement, relativePosition: Position) => void;
    onElementDragStart?: (event: React.MouseEvent, element: IElement) => void;
    onElementDrag?: (event: React.MouseEvent, element: IElement) => void;
    onElementDragStop?: (event: React.MouseEvent, element: IElement, position: Position) => void;
    onElementsConnect?: (relationship: IRelationship) => void;
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

const WorkspaceReactFlowWrapper: FC<PropsWithChildren<{
    onElementClick?: (event: React.MouseEvent, element: IElement, relativePosition: Position) => void;
    onElementDragStart?: (event: React.MouseEvent, element: IElement) => void;
    onElementDrag?: (event: React.MouseEvent, element: IElement) => void;
    onElementDragStop?: (event: React.MouseEvent, element: IElement, position: Position) => void;
    onElementsConnect?: (relationship: IRelationship) => void;
    onMouseMove?: (event: React.MouseEvent) => void;
    onViewClick?: (event: React.MouseEvent, relativePosition: Position) => void;
}>> = ({
    children,
    onElementClick,
    onElementDragStart,
    onElementDrag,
    onElementDragStop,
    onElementsConnect,
    onMouseMove,
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
        onElementDragStop?.(event, node.data.element, node.position);
    }, [onElementDragStop]);

    const handleOnMouseMove = useCallback((event: React.MouseEvent) => {
       onMouseMove?.(event);
    }, [onMouseMove]);

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
        onElementsConnect?.({
            type: RelationshipType.Relationship,
            sourceIdentifier: connection.source,
            targetIdentifier: connection.target,
            tags: []
        });
    }, [onElementsConnect]);

    return (
        <ReactFlow
            ref={reactFlowRef}
            connectionMode={ConnectionMode.Loose}
            fitViewOptions={{
                padding: 0.3,
                maxZoom: 5,
                minZoom: 0.1
            }}
            fitView
            nodeTypes={ReactFlowNodeTypes}
            defaultNodes={[]}
            nodeDragThreshold={5}
            edgeTypes={ReactFlowEdgeTypes}
            defaultEdges={[]}
            proOptions={{ hideAttribution: true }}
            snapGrid={[50, 50]}
            onNodeClick={handleOnNodeClick}
            onNodeDragStart={handleOnNodeDragStart}
            onNodeDrag={handleOnNodeDrag}
            onNodeDragStop={handleOnNodeDragStop}
            onMouseMove={handleOnMouseMove}
            onPaneClick={handleOnPaneClick}
            onConnect={handleOnConnect}
        >
            <Background
                gap={50}
                size={2}
                variant={BackgroundVariant.Dots}
            />
            <MarkerRefs>
                <MarkerCircleOutline />
                <MarkerArrowClosed />
            </MarkerRefs>
            {children}
        </ReactFlow>
    )
}