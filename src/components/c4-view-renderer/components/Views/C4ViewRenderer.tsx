import "@reactflow/core/dist/style.css";

import {
    FC,
    PropsWithChildren,
    useCallback,
    useRef,
    useState
} from "react";
import {
    ReactFlow,
    ConnectionMode,
    useReactFlow,
    useNodesState,
    useEdgesState,
    Connection,
} from "@reactflow/core";
import { Background, BackgroundVariant } from "@reactflow/background";
import { C4Diagram, createElement, createRelationship } from "../../../structurizr-dsl/Diagram";
import {
    NODE_WIDTH,
    NODE_HEIGHT,
    createNode,
    createEdge,
    NodeTypes,
    EdgeTypes
} from "../../utils/Graph";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

export type C4ViewRendererProps = {
    view?: C4Diagram;
}

export const C4DiagramRenderer: FC<PropsWithChildren<C4ViewRendererProps>> = ({
    children,
}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const reactFlowRef = useRef<HTMLDivElement>(null);
    const reactFlow = useReactFlow();

    const onConnect = useCallback((connection: Connection) => {
        if (!connection.source || !connection.target) return;
        setEdges(edges => edges.concat(createEdge(connection.source, connection.target, createRelationship())));
    }, [setEdges]);

    const onNodeDrag = useCallback((event, draggedNode) => {
        // NOTE: only allow to update nodes that are dragged and are not of type scope
        if (draggedNode.type === "scope") return;
        
        const intersections = reactFlow
            .getIntersectingNodes(draggedNode)
            .filter(node => node.type === "scope");
        const draggedOverScope = intersections.length > 0;

        setNodes(nodes => nodes.map(node => {
            if (node.type === "scope") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        draggedOver: draggedOverScope
                    }
                };
            }

            return node;
        }));
    }, [setNodes, reactFlow]);

    const onNodeDragStop = useCallback((event, draggedNode) => {
        // NOTE: only allow to update nodes that are dragged and are not of type scope
        if (draggedNode.type === "scope") return;
        
        const intersections = reactFlow
            .getIntersectingNodes(draggedNode)
            .filter(node => node.type === "scope");
        const draggedOverScope = intersections.length > 0;
        const wasInsideScope = draggedNode.parentNode !== undefined;
        
        setNodes(nodes => nodes.map(node => {
            if (node.type === "scope") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        draggedOver: false
                    }
                };
            }

            if (node.id === draggedNode.id && wasInsideScope && !draggedOverScope) {
                const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
                const outsideScopePosition = reactFlow.project({
                    x: event.clientX - reactFlowBounds.left - NODE_WIDTH / 2,
                    y: event.clientY - reactFlowBounds.top - NODE_HEIGHT / 2
                });
                return {
                    ...node,
                    position: outsideScopePosition,
                    parentNode: undefined
                };
            }

            if (node.id === draggedNode.id && !wasInsideScope && draggedOverScope) {
                const scope = intersections[0];
                const insideScopePosition = {
                    x: node.position.x - scope.position.x,
                    y: node.position.y - scope.position.y
                };
                return {
                    ...node,
                    position: insideScopePosition,
                    parentNode: scope.id
                };
            }

            return node;
        }));
    }, [setNodes, reactFlow]);
    
    const addNode = useCallback((position, type) => {
        const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
        const relativePosition = reactFlow.project({
            x: position.x - reactFlowBounds.left - NODE_WIDTH / 2,
            y: position.y - reactFlowBounds.top - NODE_HEIGHT / 2
        });

        const node = createNode(createElement(type), relativePosition, type);
        setNodes(nodes => nodes.concat(node));
    }, [setNodes, reactFlow]);

    const {
        onDragOver,
        onDrop
    } = useDragAndDrop("application/reactflow");

    const [isAddingElement, setIsAddingElement] = useState(false);
    const onMouseDown = useCallback((event) => {
        console.log("onMouseDown")
        setIsAddingElement(true);
        addNode({ x: event.clientX, y: event.clientY }, "placeholder");
    }, [setIsAddingElement, addNode]);

    const onMouseUp = useCallback(() => {
        console.log("onMouseUp")
        setIsAddingElement(false);
        setNodes(nodes => nodes.filter(node => node.type !== "placeholder"))
    }, [setIsAddingElement, setNodes]);

    const onMouseMove = useCallback(() => {
        console.log("onMouseMove")
        if(!isAddingElement) return;


    }, [isAddingElement]);

    return (
        <ReactFlow
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={NodeTypes}
            edges={edges}
            edgeTypes={EdgeTypes}
            onNodesChange={onNodesChange}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            onConnect={onConnect}
            onEdgesChange={onEdgesChange}
            onDragOver={onDragOver}
            onDrop={onDrop}
            connectionMode={ConnectionMode.Loose}
            proOptions={{ hideAttribution: true }}
            snapGrid={[20, 20]}
            snapToGrid
            fitView
            fitViewOptions={{ padding: 0.2 }}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[20, 20]}
            />
            {children}
        </ReactFlow>
    );
};
