import "@reactflow/core/dist/style.css";

import { Tag, useWorkspace } from "@justmegaara/structurizr-dsl";
import { Background, BackgroundVariant } from "@reactflow/background";
import {
    ReactFlow,
    ConnectionMode,
    useReactFlow,
    useNodesState,
    useEdgesState,
} from "@reactflow/core";
import {
    CSSProperties,
    FC,
    PropsWithChildren,
    useCallback,
    useState
} from "react";
import { ElementNodeWrapper } from "../Nodes/ElementNode";
import { RelationshipEdgeWrapper } from "../Edges/RelationshipEdge";
import { normalizePoint, parseReactFlow, projectPoint } from "../../utils";
import { useUserPresence, useWorkspaceRenderer } from "../../hooks";
import { UserCursor } from "../../../../components/UserCursor";

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

type WorkspaceRendererProps = {
    onImport?: (result) => void;
    onExport?: (result) => void;
}

export const WorkspaceRenderer: FC<PropsWithChildren<WorkspaceRendererProps>> = ({
    children,
    onImport
}) => {
    const [nodes, , onNodesChange] = useNodesState([]);
    const [edges, , onEdgesChange] = useEdgesState([]);

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

    /* handling drilldown of the views */
    const { workspace } = useWorkspace();
    const { setView } = useWorkspaceRenderer();
    
    const onNodeDoubleClick = useCallback((event, node) => {
        if (node.data.element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)) {
            setView(
                Tag.Container.name,
                workspace.views.containers.find(x => x.softwareSystemIdentifier === node.data.element.identifier)
            );
        }
        if (node.data.element.tags.some(tag => tag.name === Tag.Container.name)) {
            setView(
                Tag.Component.name,
                workspace.views.components.find(x => x.containerIdentifier === node.data.element.identifier)
            );
        }
    }, [setView, workspace]);
    
    const { getViewport } = useReactFlow();
    const { others, setSelfPoint } = useUserPresence();

    const onMouseMove = useCallback((event) => {
        const viewport = getViewport();
        const point = normalizePoint(viewport, { x: event.clientX, y: event.clientY });
        setSelfPoint(point);
    }, [setSelfPoint, getViewport]);

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
                    point={projectPoint(getViewport(), user.presence.point)}
                />
            ))}
            {children}
        </ReactFlow>
    );
};
