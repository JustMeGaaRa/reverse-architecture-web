import "@reactflow/core/dist/style.css";
import '@reactflow/node-resizer/dist/style.css';

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    Connection,
    ConnectionMode,
    Node,
    NodeChange,
    NodeDimensionChange,
    NodePositionChange,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow
} from "@reactflow/core";
import {
    Dimensions,
    ElementType,
    IElement,
    IRelationship,
    IWorkspaceSnapshot,
    Position,
    RelationshipType,
    Size
} from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { useWorkspace } from "../hooks";
import { getAbsolutePoint } from "../utils";
import { MarkerArrowClosed, MarkerCircleOutline, MarkerRefs } from "./Edges";
import { ReactFlowEdgeTypes, ReactFlowNodeTypes } from "./ReactFlow";

export const Workspace: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    onElementClick?: (element: IElement, relativePosition: Position) => void;
    onElementPositionChange?: (element: IElement, position: Position) => void;
    onElementDimensionsChange?: (element: IElement, dimensions: Dimensions) => void;
    onElementsConnect?: (relationship: IRelationship) => void;
    onViewClick?: (relativePosition: Position) => void;
}>> = ({
    children,
    workspace,
    onElementClick,
    onElementPositionChange,
    onElementDimensionsChange,
    onElementsConnect,
    onViewClick
}) => {
    const { setWorkspace } = useWorkspace();
    
    useEffect(() => setWorkspace(workspace), [workspace, setWorkspace]);

    return (
        <ReactFlowProvider>
            <WorkspaceReactFlowWrapper
                onElementClick={onElementClick}
                onElementPositionChange={onElementPositionChange}
                onElementDimensionsChange={onElementDimensionsChange}
                onElementsConnect={onElementsConnect}
                onViewClick={onViewClick}
            >
                {children}
            </WorkspaceReactFlowWrapper>
        </ReactFlowProvider>
    )
}

const WorkspaceReactFlowWrapper: FC<PropsWithChildren<{
    onElementClick?: (element: IElement, relativePosition: Position) => void;
    onElementPositionChange?: (element: IElement, position: Position) => void;
    onElementDimensionsChange?: (element: IElement, dimensions: Dimensions) => void;
    onElementsConnect?: (relationship: IRelationship) => void;
    onMouseMove?: () => void;
    onViewClick?: (relativePosition: Position) => void;
}>> = ({
    children,
    onElementClick,
    onElementPositionChange,
    onElementDimensionsChange,
    onElementsConnect,
    onMouseMove,
    onViewClick
}) => {
    const { getViewport, getNode } = useReactFlow();
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
            onElementClick?.(node.data.element, pointRelativeToNode);
        }
    }, [getViewport, onElementClick]);

    const handleOnNodesChange = useCallback((changes: NodeChange[]) => {
        changes
            .filter(change => change.type === "dimensions" && change.resizing === false)
            .forEach(change => {
                const dimensionChange = change as NodeDimensionChange;
                const node = getNode(dimensionChange.id);
                const element = node?.data.element;
                onElementDimensionsChange?.(element, { x: node.position.x, y: node.position.y, height: node.height, width: node.width });
            });
        changes
            .filter(change => change.type === "position")
            .forEach(change => {
                const positionChange = change as NodePositionChange;
                const node = getNode(positionChange.id);
                const element = node?.data.element;
                onElementPositionChange?.(element, { x: node.position.x, y: node.position.y });
            });
    }, [onElementDimensionsChange, onElementPositionChange, getNode]);

    const handleOnMouseMove = useCallback((event: React.MouseEvent) => {
       onMouseMove?.();
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
            onViewClick?.(pointTranslatedFromViewport);
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
            onNodesChange={handleOnNodesChange}
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