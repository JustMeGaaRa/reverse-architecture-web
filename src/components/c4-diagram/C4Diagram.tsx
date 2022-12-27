import {
    FC,
    useCallback,
    useMemo,
    useRef
} from "react";
import { Link } from "react-router-dom";
import ReactFlow, {
    Node,
    ConnectionMode,
    Background,
    MiniMap,
    Controls,
    Panel,
    useNodesState,
    useEdgesState,
    updateEdge,
    useReactFlow,
    BackgroundVariant,
    ControlButton,
} from "reactflow";
import { FaArrowLeft } from "react-icons/fa";
import { AvatarGroup, HStack, IconButton } from "@chakra-ui/react";

import { C4ScopeNode } from "./nodes/C4ScopeNode";
import { C4RectangleNode } from "./nodes/C4RectangleNode";
import { C4FloatingEdge } from "./edges/C4FloatingEdge";
import { C4AbstractionDraggable } from "./nodes/C4AbstractionDraggable";
import {
    Abstraction,
    Relationship,
    Diagram,
    Position,
    AbstractionTypeCode
} from "./types";
import {
    NodeType,
    EdgeType,
    createNode,
    createEdge,
    createAbstraction,
    createRelationship,
    getDiagramNodes,
    getDiagramEdges,
    getAbstractionBgColor,
    getAbstractionName,
    NODE_WIDTH,
    NODE_HEIGHT,
} from "./utils";

export interface IC4DiagramProps {
    diagram: Diagram;
    onNodeAdded?: (node: Abstraction, position: Position) => void;
    onNodeDeleted?: (node: Abstraction) => void;
    onNodePositionChanged?: (node: Node, positon: Position) => void;
    onNodeStateChanged?: (node: Node) => void;
    onEdgeAdded?: (edge: Relationship) => void;
    onEdgeDeleted?: (edge: Relationship) => void;
    onEdgeStateChanged?: (edge: Relationship) => void;
}

export const C4Diagram: FC<IC4DiagramProps> = ({ diagram }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(getDiagramNodes(diagram));
    const [edges, setEdges, onEdgesChange] = useEdgesState(getDiagramEdges(diagram));

    const reactFlowRef = useRef<HTMLDivElement>(null);
    const { getIntersectingNodes, project } = useReactFlow<Abstraction, Relationship>();

    const nodeTypes = useMemo(() => ({
        [NodeType.Block]: C4RectangleNode,
        [NodeType.Person]: C4RectangleNode,
        [NodeType.Cylinder]: C4RectangleNode,
        [NodeType.Scope]: C4ScopeNode
    }), []);
    const edgeTypes = useMemo(() => ({
        [EdgeType.Floating]: C4FloatingEdge
    }), []);

    const abstractionCodes = [
        AbstractionTypeCode.SoftwareSystem,
        AbstractionTypeCode.Container,
        AbstractionTypeCode.Component,
        AbstractionTypeCode.Person
    ];

    const onNodeDrag = useCallback((event, draggedNode) => {
        if (draggedNode.type === "scope") return;

        const intersections = getIntersectingNodes(draggedNode);
        const draggedOverScope = intersections.some(node => node.type === "scope");
        
        setNodes(nodes => nodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                draggedOver: intersections.some(i => i.id === node.id) && draggedOverScope
            }
        })));
    }, [setNodes, getIntersectingNodes]);

    const onNodeDragStop = useCallback((event, draggedNode) => {
        if (draggedNode.type === "scope") return;

        const intersections = getIntersectingNodes(draggedNode);
        const draggedOverScope = intersections.some(node => node.type === "scope");

        setNodes(nodes => nodes.map(node => ({
            ...node,
            parentNode: node.id === draggedNode.id && draggedOverScope
                ? intersections[0].id
                : undefined
        })));
    }, [setNodes, getIntersectingNodes])

    const onNodeDelete = useCallback((abstraction: Abstraction) => {
        setNodes((nodes) => nodes.filter(node => node.id !== abstraction.abstractionId));
    }, [setNodes]);

    const onConnect = useCallback((params) => {
        if (!params.source || !params.target) return;
        const relationship = createRelationship(params.source, params.target);
        const edge = createEdge(relationship);
        setEdges((edges) => edges.concat(edge));
    }, [setEdges]);

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        setEdges((edges) => updateEdge(oldEdge, newConnection, edges));
    }, [setEdges]);

    const onDragStart = useCallback((event, abstractionTypeCode) => {
        event.dataTransfer.setData("application/reactflow", abstractionTypeCode);
        event.dataTransfer.effectAllowed = "move";
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event) => {
        if (!reactFlowRef.current) return;
        event.preventDefault();

        const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
        const abstractionCode = event.dataTransfer.getData("application/reactflow");
        const abstractionPosition = project({
            x: event.clientX - reactFlowBounds.left - NODE_WIDTH / 2,
            y: event.clientY - reactFlowBounds.top - NODE_HEIGHT / 2
        });

        const abstraction = createAbstraction(abstractionCode);
        const node = createNode(abstraction, abstractionPosition, undefined, onNodeDelete);
        setNodes((nodes) => nodes.concat(node));
    }, [setNodes, onNodeDelete, project]);

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            onDragOver={onDragOver}
            onDrop={onDrop}
            ref={reactFlowRef}
            connectionMode={ConnectionMode.Loose}
            proOptions={{ hideAttribution: true }}
            snapGrid={[25, 25]}
            snapToGrid
            fitView
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[25, 25]}
            />
            <Controls>
                <ControlButton>S</ControlButton>
                <ControlButton>R</ControlButton>
            </Controls>
            <MiniMap
                nodeColor={(node) => getAbstractionBgColor(node.data.abstraction.type.code)}
                zoomable
                pannable
            />
            <Panel position={"top-left"}>
                <HStack>
                    <IconButton
                    icon={<FaArrowLeft />}
                    aria-label={"Back"}
                    as={Link}
                    to={"/"}
                    />
                </HStack>
            </Panel>
            <Panel position={"top-center"}>
                <HStack>
                    {abstractionCodes.map(type => (
                    <C4AbstractionDraggable
                        key={type}
                        typeCode={type}
                        title={getAbstractionName(type)}
                        onDragStart={onDragStart}
                    />
                    ))}
                </HStack>
            </Panel>
            <Panel position={"top-right"}>
                <HStack>
                    <AvatarGroup size={"sm"} max={3}>
                    {/* {users && users.map(user => (
                        <Avatar key={user} name={user} />
                    ))} */}
                    </AvatarGroup>
                </HStack>
            </Panel>
        </ReactFlow>
    );
};
