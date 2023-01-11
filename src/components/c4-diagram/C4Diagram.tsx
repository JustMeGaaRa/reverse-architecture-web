import {
    FC,
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
    Controls,
    ControlButton,
    updateEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "reactflow";
import { FaFileExport, FaFileImport } from "react-icons/fa";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/react";
import FileSaver from "file-saver";

import { C4ScopeNode } from "./nodes/C4ScopeNode";
import { C4RectangleNode, C4RectangleProps } from "./nodes/C4RectangleNode";
import { C4FloatingEdge, C4FloatingEdgeProps } from "./edges/C4FloatingEdge";
import { C4RectangleDraggable } from "./nodes/C4RectangleDraggable";
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
import { RelationshipEditor } from "../panels/RelationshipEditor";
import { AbstractionEditor } from "../panels/AbstractionEditor";
import { exportToDrawio } from "./export/DrawioExporter";

export type C4DiagramProps = {
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

export const C4Diagram: FC<C4DiagramProps> = ({ diagram, technologies }) => {
    
    const [nodes, setNodes, onNodesChange] = useNodesState(getDiagramNodes(diagram));
    const [edges, setEdges, onEdgesChange] = useEdgesState(getDiagramEdges(diagram));
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);

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

    const abstractionCodes = [
        AbstractionTypeCode.SoftwareSystem,
        AbstractionTypeCode.Container,
        AbstractionTypeCode.Component,
        AbstractionTypeCode.Person
    ];

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

    const MediaFormat = "application/reactflow";
    const onDragStart = useCallback((event, abstractionTypeCode) => {
        event.dataTransfer.setData(MediaFormat, abstractionTypeCode);
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
        const abstractionCode = event.dataTransfer.getData(MediaFormat);
        const abstractionPosition = reactFlow.project({
            x: event.clientX - reactFlowBounds.left - NODE_WIDTH / 2,
            y: event.clientY - reactFlowBounds.top - NODE_HEIGHT / 2
        });

        const abstraction = createAbstraction(abstractionCode);
        const node = createNode(abstraction, abstractionPosition);
        setNodes((nodes) => nodes.concat(node));
    }, [setNodes, reactFlow]);
    
    const onBlur = useCallback(() => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }, [setSelectedNode, setSelectedEdge]);

    const [shapePanelOpened, setShapePanelOpened] = useState(false);
    const onShapesClick = useCallback(() => {
        setShapePanelOpened(!shapePanelOpened);
    }, [setShapePanelOpened, shapePanelOpened]);

    const importFileRef = useRef<HTMLInputElement>(null);

    const restoreFlow = useCallback((flow: ReactFlowJsonObject<C4RectangleProps, C4FloatingEdgeProps>) => {
        if (flow) {
            setNodes(flow.nodes);
            setEdges(flow.edges);
            reactFlow.setViewport(flow.viewport);
        }
    }, [setNodes, setEdges, reactFlow]);

    const onExportClick = useCallback(() => {
        FileSaver.saveAs(new File(
            [exportToDrawio(reactFlow.toObject())],
            `${diagram.title}.drawio`
        ));
    }, [reactFlow, diagram]);

    const onImportClick = useCallback((event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => restoreFlow(JSON.parse(event.target.result as string));
        fileReader.readAsText(file);
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
        }));
    }, [setNodes, selectedNode]);

    const onAbstractionCancel = useCallback(() => {
        setSelectedNode(null);
    }, []);   

    const onRelationshipChange = useCallback((relationship) => {
        setSelectedEdge(relationship);
    }, []); 

    const onRelationshipSave = useCallback(() => {
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
            <Controls position={"bottom-right"}>
                <ControlButton
                    title={"shapes"}
                    onClick={onShapesClick}
                >
                    <Popover
                        isOpen={shapePanelOpened}
                        placement={"right-end"}
                    >
                        <PopoverTrigger>
                            <DragHandleIcon />
                        </PopoverTrigger>
                        <PopoverContent width={"56"}>
                            <PopoverHeader>
                                Abstraction Shapes
                            </PopoverHeader>
                            <PopoverBody display={"flex"} flexDirection={"column"} gap={2}>
                                {abstractionCodes.map(type => (
                                    <C4RectangleDraggable
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
                <ControlButton
                    title={"export"}
                    onClick={onExportClick}
                >
                    <FaFileExport />
                </ControlButton>
                {false && (
                    <ControlButton
                        title={"import"}
                        onClick={() => importFileRef && importFileRef.current.click()}
                    >
                        <Input
                            accept={".json"}
                            hidden
                            ref={importFileRef}
                            type={"file"}
                            onChange={onImportClick}
                        />
                        <FaFileImport />
                    </ControlButton>
                )}
            </Controls>
            <AbstractionEditor
                data={selectedNode}
                options={{ technologies }}
                onChange={onAbstractionChange}
                onSave={onAbstractionSave}
                onCancel={onAbstractionCancel}
            />
            <RelationshipEditor
                data={selectedEdge}
                options={{ technologies }}
                onChange={onRelationshipChange}
                onSave={onRelationshipSave}
                onCancel={onRelationshipCancel}
            />
        </ReactFlow>
    );
};
