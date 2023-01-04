import {
    FC,
    useCallback,
    useMemo,
    useRef,
    useState
} from "react";
import ReactFlow, {
    Node,
    ConnectionMode,
    Background,
    Controls,
    Panel,
    useNodesState,
    useEdgesState,
    updateEdge,
    useReactFlow,
    BackgroundVariant,
    ControlButton,
    ReactFlowJsonObject,
} from "reactflow";
import { FaAngleDoubleRight, FaFileExport, FaFileImport } from "react-icons/fa";
import {
    IconButton,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text
} from "@chakra-ui/react";

import { C4ScopeNode } from "./nodes/C4ScopeNode";
import { C4RectangleNode, IAbstractionProps } from "./nodes/C4RectangleNode";
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
    getAbstractionName,
    NODE_WIDTH,
    NODE_HEIGHT,
} from "./utils";
import { EditorPanel } from "../EditorPanel";
import { RelationshipEditor } from "../RelationshipEditor";
import { AbstractionEditor } from "../AbstractionEditor";
import { Logo } from "../Logo";
import { ControlPanel } from "../ControlPanel";

export interface IC4DiagramProps {
    diagram: Diagram;
    technologies: Array<string>;
    onNodeAdded?: (node: Abstraction, position: Position) => void;
    onNodeDeleted?: (node: Abstraction) => void;
    onNodePositionChanged?: (node: Node, positon: Position) => void;
    onNodeStateChanged?: (node: Node) => void;
    onEdgeAdded?: (edge: Relationship) => void;
    onEdgeDeleted?: (edge: Relationship) => void;
    onEdgeStateChanged?: (edge: Relationship) => void;
}

export const C4Diagram: FC<IC4DiagramProps> = ({ diagram, technologies }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(getDiagramNodes(diagram));
    const [edges, setEdges, onEdgesChange] = useEdgesState(getDiagramEdges(diagram));
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);

    const reactFlowRef = useRef<HTMLDivElement>(null);
    const { getIntersectingNodes, project, toObject, setViewport } = useReactFlow<Abstraction, Relationship>();

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
        // NOTE: only allow to update nodes that are dragged and are not of type scope
        if (draggedNode.type === "scope") return;
        
        const intersections = getIntersectingNodes(draggedNode).filter(node => node.type === "scope");
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
    }, [setNodes, getIntersectingNodes]);

    const onNodeDragStop = useCallback((event, draggedNode) => {
        // NOTE: only allow to update nodes that are dragged and are not of type scope
        if (draggedNode.type === "scope") return;
        
        const intersections = getIntersectingNodes(draggedNode).filter(node => node.type === "scope");
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
                const outsideScopePosition = project({
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
    }, [setNodes, getIntersectingNodes, project]);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node.data.abstraction);
        setSelectedEdge(null);
    }, []);

    const onNodeDelete = useCallback((abstraction: Abstraction) => {
        setNodes((nodes) => nodes.filter(node => node.id !== abstraction.abstractionId));
    }, [setNodes]);

    const onConnect = useCallback((params) => {
        if (!params.source || !params.target) return;
        const relationship = createRelationship(params.source, params.target);
        const edge = createEdge(relationship);
        setEdges((edges) => edges.concat(edge));
    }, [setEdges]);

    const onEdgeClick = useCallback((event, edge) => {
        setSelectedNode(null);
        setSelectedEdge(edge.data);
    }, []);

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
    
    const onBlur = useCallback(() => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }, [setSelectedNode, setSelectedEdge]);

    const restoreFlow = useCallback((flow: ReactFlowJsonObject<IAbstractionProps, Relationship>) => {
        if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            const { nodes = [], edges = [] } = flow;
            setNodes(nodes);
            setEdges(edges);
            setViewport({ x, y, zoom });
        }
    }, [setNodes, setEdges, setViewport]);

    const [shapePanelOpened, setShapePanelOpened] = useState(false);
    const onShapesClick = useCallback(() => {
        setShapePanelOpened(!shapePanelOpened);
    }, [setShapePanelOpened, shapePanelOpened]);

    const flowKey = "c4-diagram-sandbox";

    const onExportClick = useCallback(() => {
        const flow = toObject();
        const flowString = JSON.stringify(flow);
        localStorage.setItem(flowKey, flowString);
    }, [toObject]);

    const onImportClick = useCallback(() => {
        const flowString = localStorage.getItem(flowKey);
        const flow = JSON.parse(flowString);
        restoreFlow(flow);
    }, [restoreFlow]);

    const onAbstractionChange = useCallback((abstraction) => {
        setSelectedNode(abstraction);
    }, []);

    const onAbstractionSave = useCallback(() => {
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
        }))
    }, [setNodes, selectedNode]);

    const onAbstractionCancel = useCallback(() => {
        setSelectedNode(null);
    }, []);   

    const onRelationshipChange = useCallback((relationship) => {
        setSelectedEdge(relationship);
    }, []); 

    const onRelationshipSave = useCallback(() => {
        setEdges((edges) => edges.map(edge => {
            if (edge.data.relationshipId === selectedEdge.relationshipId) {
                const updatedEdge = {
                    ...edge,
                    data: selectedEdge
                };
                return updatedEdge;
            }
            return edge;
        }))
    }, [setEdges, selectedEdge]);

    const onRelationshipCancel = useCallback(() => {
        setSelectedEdge(null);
    }, []);

    return (
        <ReactFlow
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
            onBlur={onBlur}
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
                <ControlButton title={"shapes"} onClick={onShapesClick}>
                    <Popover
                        isOpen={shapePanelOpened}
                        placement={"right-end"}
                    >
                        <PopoverTrigger>
                            <IconButton
                                aria-label={"ads"}
                                icon={<FaAngleDoubleRight />}
                                variant={"link"}
                                onClick={onShapesClick}
                            />
                        </PopoverTrigger>
                        <PopoverContent width={"56"}>
                            <PopoverCloseButton />
                            <PopoverHeader>
                                Abstraction Shapes
                            </PopoverHeader>
                            <PopoverBody display={"flex"} flexDirection={"column"} gap={2}>
                                {abstractionCodes.map(type => (
                                    <C4AbstractionDraggable
                                        key={type}
                                        typeCode={type}
                                        title={getAbstractionName(type)}
                                        onDragStart={onDragStart}
                                    />
                                ))}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </ControlButton>
                <ControlButton title={"export"} onClick={onExportClick}>
                    <FaFileExport />
                </ControlButton>
                <ControlButton title={"import"} onClick={onImportClick}>
                    <FaFileImport />
                </ControlButton>
            </Controls>
            <Panel position={"top-left"}>
                <ControlPanel direction={"row"} divider>
                    <Logo />
                    {diagram.title && (
                        <Text as={"b"}>
                            {diagram.title}
                        </Text>
                    )}
                </ControlPanel>
            </Panel>
            <Panel position={"top-right"}>
                {selectedNode && (
                    <EditorPanel
                        onSave={onAbstractionSave}
                        onCancel={onAbstractionCancel}
                    >
                        <AbstractionEditor
                            data={selectedNode}
                            options={{ technologies }}
                            onChange={onAbstractionChange}
                        />
                    </EditorPanel>
                )}
                {selectedEdge && (
                    <EditorPanel
                        onSave={onRelationshipSave}
                        onCancel={onRelationshipCancel}
                    >
                        <RelationshipEditor
                            data={selectedEdge}
                            options={{ technologies }}
                            onChange={onRelationshipChange}
                        />
                    </EditorPanel>
                )}
            </Panel>
        </ReactFlow>
    );
};
