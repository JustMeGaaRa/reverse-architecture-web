import "@reactflow/core/dist/style.css";

import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    useReactFlow,
    useNodesState,
    useEdgesState,
    Node
} from "@reactflow/core";
import {
    CSSProperties,
    FC,
    PropsWithChildren,
    useCallback,
    useRef,
    useState
} from "react";
import { ElementNodeWrapper, ElementNodeWrapperProps } from "../Nodes/ElementNode";
import { RelationshipEdgeWrapper } from "../Edges/RelationshipEdge";
import { UserCursor, useUserPresence } from "../../../OnlineUsers";
import { useWorkspaceRenderer } from "../../hooks";
import { Tag } from "../../../../dsl";
import { normalizePoint, parseReactFlow, projectPoint } from "../../utils";

const NodeTypes = {
    element: ElementNodeWrapper,
    box: ElementNodeWrapper,
    cylinder: ElementNodeWrapper,
    hexagon: ElementNodeWrapper,
    person: ElementNodeWrapper,
    pipe: ElementNodeWrapper,
    roundedBox: ElementNodeWrapper
}

const EdgeTypes = {
    relationship: RelationshipEdgeWrapper,
    straight: RelationshipEdgeWrapper,
    step: RelationshipEdgeWrapper,
    smoothstep: RelationshipEdgeWrapper,
    simplebezier: RelationshipEdgeWrapper
}

const SupportedFileTypes = new Set(["application/json"]);

type C4DiagramRendererProps = {
    onImport?: (result) => void;
    onExport?: (result) => void;
}

export const C4DiagramRenderer: FC<PropsWithChildren<C4DiagramRendererProps>> = ({
    children,
    onImport
}) => {
    const [nodes, , onNodesChange] = useNodesState([]);
    const [edges, , onEdgesChange] = useEdgesState([]);

    const reactFlowRef = useRef<HTMLDivElement>(null);
    const reactFlow = useReactFlow();

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

    const { renderContainerView, renderComponentView } = useWorkspaceRenderer();
    const { fitView } = useReactFlow();

    const onNodeDoubleClick = useCallback((event, node: Node<ElementNodeWrapperProps>) => {
        if (node.data.element.tags.some(x => x.name === Tag.SoftwareSystem.name)) {
            renderContainerView(node.data.element.identifier);
            fitView({ padding: 0.2, duration: 500 });
        }
        if (node.data.element.tags.some(x => x.name === Tag.Container.name)) {
            renderComponentView(node.data.element.identifier);
            fitView({ padding: 0.2, duration: 500 });
        }
    }, [renderContainerView, renderComponentView, fitView]);

    const viewport = reactFlow.getViewport();
    const { others, setSelfPoint } = useUserPresence();

    const onMouseMove = useCallback((event) => {
        const point = normalizePoint(viewport, { x: event.clientX, y: event.clientY });
        setSelfPoint(point);
    }, [setSelfPoint, viewport]);

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
            snapGrid={[40, 40]}
            onNodeDoubleClick={onNodeDoubleClick}
            onMouseMove={onMouseMove}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDragOver={() => setIsDragOver(true)}
            onDragExit={() => setIsDragOver(false)}
            onDrop={onDrop}
            style={isDragOver ? dropStyle : defaultStyle}
        >
            <Background
                variant={BackgroundVariant.Dots}
                gap={[40, 40]}
            />
            
            {others.map(user => (
                <UserCursor
                    key={user.id}
                    user={user.presence}
                    point={projectPoint(viewport, user.presence.point)}
                />
            ))}
            {children}
        </ReactFlow>
    );
};
