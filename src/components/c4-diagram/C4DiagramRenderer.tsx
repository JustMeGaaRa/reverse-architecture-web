import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
    useState
} from "react";
import ReactFlow, {
    Node,
    ReactFlowJsonObject,
    ConnectionMode,
    Background,
    BackgroundVariant,
    updateEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "reactflow";
import {
    C4RectangleNode,
    C4RectangleProps,
    C4ScopeNode
} from "./NodeTypes";
import {
    C4FloatingEdge,
    C4FloatingEdgeProps,
} from "./EdgeTypes";
import { RelationshipEditor } from "../panels/RelationshipEditor";
import { AbstractionEditor } from "../panels/AbstractionEditor";
import { Panel } from "../panels/Panel";
import { CollaborationPanel, CollaborationPanelProps } from "../panels/CollaborationPanel";
import { ControlsPanel } from "../panels/ControlsPanel";
import { InteractivityPanel } from "../panels/InteractivityPanel";
import {
    Abstraction,
    Relationship,
    Diagram,
    Position,
    createAbstraction,
    createRelationship
} from "./types";
import {
    NodeType,
    EdgeType,
    createNode,
    createEdge,
    getDiagramNodes,
    getDiagramEdges,
    NODE_WIDTH,
    NODE_HEIGHT
} from "./utils";
import { useDragAndDrop } from "../../components/c4-diagram/hooks";

export type C4DiagramRendererProps = Partial<Pick<CollaborationPanelProps, "users">> & {
    diagram: Diagram;
    technologies: Array<string>;
}

export const C4DiagramRenderer: FC<PropsWithChildren<C4DiagramRendererProps>> = ({
    children,
    diagram,
    technologies,
    users
}) => {
    
    const [nodes, setNodes, onNodesChange] = useNodesState(getDiagramNodes(diagram));
    const [edges, setEdges, onEdgesChange] = useEdgesState(getDiagramEdges(diagram));
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);

    const MediaFormat = "application/reactflow";
    const { onDragStart, onDragOver, onDrop } = useDragAndDrop(MediaFormat, (p, d) => { console.log(d) });

    const reactFlowRef = useRef<HTMLDivElement>(null);
    const reactFlow = useReactFlow();

    const nodeTypes = useMemo(() => ({
        [NodeType.Block]: C4RectangleNode,
        [NodeType.Person]: C4RectangleNode,
        [NodeType.Cylinder]: C4RectangleNode,
        [NodeType.Scope]: C4ScopeNode
    }), []);
    const edgeTypes = useMemo(() => ({
        [EdgeType.Floating]: C4FloatingEdge
    }), []);

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

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node.data.abstraction);
        setSelectedEdge(null);
    }, []);

    const onNodeDelete = useCallback(() => {
        setNodes((nodes) => nodes.filter(node => node.data.abstraction.abstractionId !== selectedNode.abstractionId));
    }, [setNodes, selectedNode]);

    const onConnect = useCallback((params) => {
        if (!params.source || !params.target) return;
        const relationship = createRelationship(params.source, params.target);
        const edge = createEdge(relationship);
        setEdges((edges) => edges.concat(edge));
    }, [setEdges]);

    const onEdgeClick = useCallback((event, edge) => {
        setSelectedNode(null);
        setSelectedEdge(edge.data.relationship);
    }, []);

    const onEdgeDelete = useCallback(() => {
        setEdges((edges) => edges.filter(edge => edge.data.relationship.relationshipId !== selectedEdge.relationshipId));
    }, [setEdges, selectedEdge]);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        setEdges((edges) => updateEdge(oldEdge, newConnection, edges));
    }, [setEdges]);
    
    const onBlur = useCallback(() => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }, [setSelectedNode, setSelectedEdge]);

    const restoreFlow = useCallback((flow: ReactFlowJsonObject<C4RectangleProps, C4FloatingEdgeProps>) => {
        if (flow) {
            setNodes(flow.nodes);
            setEdges(flow.edges);
            reactFlow.setViewport(flow.viewport);
        }
    }, [setNodes, setEdges, reactFlow]);

    const addAbstraction = useCallback((position, code) => {
        const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
        const abstractionPosition = reactFlow.project({
            x: position.x - reactFlowBounds.left - NODE_WIDTH / 2,
            y: position.y - reactFlowBounds.top - NODE_HEIGHT / 2
        });

        const abstraction = createAbstraction(code);
        const node = createNode(abstraction, abstractionPosition);
        setNodes((nodes) => nodes.concat(node));
    }, [setNodes, reactFlow]);

    const onNodeDataChange = useCallback((abstraction) => {
        setSelectedNode(abstraction);
    }, []);

    const onNodeDataSave = useCallback(() => {
        setNodes((nodes) => nodes.map(node => {
            if (node.data.abstraction.abstractionId === selectedNode.abstractionId) {
                const updatedNode = {
                    ...node,
                    data: {
                        ...node.data,
                        abstraction: selectedNode
                    }
                };
                return updatedNode;
            }
            return node;
        }));
    }, [setNodes, selectedNode]);

    const onNodeDataCancel = useCallback(() => {
        setSelectedNode(null);
    }, []);   

    const onEdgeDataChange = useCallback((relationship) => {
        setSelectedEdge(relationship);
    }, []); 

    const onEdgeDataSave = useCallback(() => {
        setEdges((edges) => edges.map(edge => {
            if (edge.data.relationship.relationshipId === selectedEdge.relationshipId) {
                const updatedEdge = {
                    ...edge,
                    data: selectedEdge
                };
                return updatedEdge;
            }
            return edge;
        }));
    }, [setEdges, selectedEdge]);

    const onEdgeDataCancel = useCallback(() => {
        setSelectedEdge(null);
    }, []);

    return (
        <ReactFlow
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            onNodeClick={onNodeClick}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onEdgeClick={onEdgeClick}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            // onBlur={onBlur}
            connectionMode={ConnectionMode.Loose}
            proOptions={{ hideAttribution: true }}
            snapGrid={[20, 20]}
            snapToGrid
            fitView
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[20, 20]}
            />
            <CollaborationPanel
                users={users}
            />
            <ControlsPanel
                onDragStart={onDragStart}
            />
            <InteractivityPanel
                
            />
            {(selectedNode || selectedEdge) && (
                <Panel dock={"right-center"} padding={4} zIndex={9}>
                    <AbstractionEditor
                        data={selectedNode}
                        options={{ technologies }}
                        onChange={onNodeDataChange}
                        onSave={onNodeDataSave}
                        onCancel={onNodeDataCancel}
                    />
                    <RelationshipEditor
                        data={selectedEdge}
                        options={{ technologies }}
                        onChange={onEdgeDataChange}
                        onSave={onEdgeDataSave}
                        onCancel={onEdgeDataCancel}
                    />
                </Panel>
            )}
            {children}
        </ReactFlow>
    );
};
