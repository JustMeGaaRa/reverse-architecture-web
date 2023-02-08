import "@reactflow/core/dist/style.css";

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    useReactFlow,
    useNodesState,
    useEdgesState,
    Connection,
    MarkerType
} from "@reactflow/core";
import {
    CSSProperties,
    FC,
    PropsWithChildren,
    useCallback,
    useRef,
    useState
} from "react";
import { ElementNode } from "../Nodes/ElementNode";
import { ElementPlaceholder } from "../Nodes/ElementPlaceholder";
import { RelationshipEdge } from "../Edges/RelationshipEdge";
import { CollaborationPanel, InteractivityPanel, NavigationPanel } from "../Panels";
import { v4 } from "uuid";
import { useC4BuilderStore } from "../../store";
import { parseReactFlow } from "../../utils";

const NodeTypes = {
    default: ElementNode,
    box: ElementNode,
    cylinder: ElementNode,
    hexagon: ElementNode,
    person: ElementNode,
    pipe: ElementNode,
    roundedBox: ElementNode,
    placeholder: ElementPlaceholder
}

const EdgeTypes = {
    default: RelationshipEdge,
    straight: RelationshipEdge,
    step: RelationshipEdge,
    smoothstep: RelationshipEdge,
    simplebezier: RelationshipEdge,
    floating: RelationshipEdge
}

const SupportedFileTypes = new Set(["application/json"]);

type C4DiagramRendererProps = {
    onImport?: (result: any) => void;
    onExport?: (result: any) => void;
}

export const C4DiagramRenderer: FC<PropsWithChildren<C4DiagramRendererProps>> = ({
    children,
    onImport
}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const { addElement, addRelationship } = useC4BuilderStore();
    const reactFlowRef = useRef<HTMLDivElement>(null);
    const reactFlow = useReactFlow();    
    
    const addNode = useCallback((position, type) => {
        const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
        const relativePosition = reactFlow.project({
            x: position.x - reactFlowBounds.left,
            y: position.y - reactFlowBounds.top
        });
        const node = {
            id: v4(),
            type: type ?? "roundedBox",
            data: addElement(type),
            position: relativePosition,
            parentNode: undefined
        };
        setNodes(nodes => nodes.concat(node));
    }, [setNodes, addElement, reactFlow]);
    const addEdge = useCallback((connection) => {
        const relationship = addRelationship("");
        const edge = {
            id: v4(),
            type: "default",
            label: relationship.description,
            data: relationship,
            source: connection.source,
            target: connection.target,
            markerEnd: { type: MarkerType.Arrow }
        };
        setEdges(edges => edges.concat(edge));
    }, [setEdges, addRelationship])

    const onConnect = useCallback((connection: Connection) => {
        if (!connection.source || !connection.target) return;
        addEdge(connection);
    }, [addEdge]);

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
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top
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

    const defaultStyle: CSSProperties = {
        border: "dashed 3px transparent",
        boxSizing: "border-box"
    }
    const dropStyle: CSSProperties = {
        background: "#0064ff33",
        border: "dashed 3px #009fff",
        boxSizing: "border-box"
    };
    const [isDragOver, setIsDragOver] = useState(false);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        setIsDragOver(false);
        
        const draggedFiles = Array
            .from(event.dataTransfer.files)
            .filter(file => SupportedFileTypes.has(file.type));

        const restoreFromJson = (json: string) => {
            onImport(parseReactFlow(json));
        };

        draggedFiles.forEach(file => {
            const fileReader = new FileReader();
            fileReader.onload = (event) => restoreFromJson(event.target.result as string);
            fileReader.readAsText(file);
        });
    }, [onImport]);

    return (
        <ReactFlow
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.2, duration: 500 }}
            edges={edges}
            edgeTypes={EdgeTypes}
            nodes={nodes}
            nodeTypes={NodeTypes}
            proOptions={{ hideAttribution: true }}
            ref={reactFlowRef}
            snapGrid={[20, 20]}
            snapToGrid
            onConnect={onConnect}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDragOver={() => setIsDragOver(true)}
            onDragExit={() => setIsDragOver(false)}
            onDrop={onDrop}
            style={isDragOver ? dropStyle : defaultStyle}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[20, 20]}
            />
            
            <CollaborationPanel />
            <InteractivityPanel />
            <NavigationPanel />
            
            {children}
        </ReactFlow>
    );
};
