import "@reactflow/core/dist/style.css";

import { Tag, useWorkspace } from "@justmegaara/structurizr-dsl";
import { useYReactFlow } from "@justmegaara/y-reactflow";
import { Background, BackgroundVariant } from "@reactflow/background";
import { useUserPresence } from "@reversearchitecture/hooks";
import {
    ReactFlow,
    ConnectionMode,
    useReactFlow,
    useNodesState,
    useEdgesState,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
} from "react";
import { UserCursor } from "../../../../components";
import { ElementNodeWrapper } from "../Nodes/ElementNode";
import { RelationshipEdgeWrapper } from "../Edges/RelationshipEdge";
import { normalizePoint, projectPoint } from "../../utils/ReactFlow";
import { useWorkspaceRenderer } from "../../hooks";

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

type WorkspaceRendererProps = {
    onImport?: (result) => void;
    onExport?: (result) => void;
}

export const WorkspaceRenderer: FC<PropsWithChildren<WorkspaceRendererProps>> = ({
    children
}) => {
    const [nodes, , onNodesChange] = useNodesState([]);
    const [edges, , onEdgesChange] = useEdgesState([]);

    /* handling the updates via y.js shared state */
    const { updateNodes, deleteNodes } = useYReactFlow();

    const onNodeDragStop = useCallback(() => { updateNodes(nodes); }, [nodes, updateNodes]);
    const onNodesDelete = useCallback(() => { deleteNodes(nodes); }, [nodes, deleteNodes]);

    /* handling drilldown of the views */
    const { workspace } = useWorkspace();
    const { setView } = useWorkspaceRenderer();
    
    const onNodeDoubleClick = useCallback((event, node) => {
        const findTagAndSetView = (element, tagName, viewName, identifierKey, views) => {
            if (element.tags.some(tag => tag.name === tagName)) {
                setView(viewName, views.find(x => x[identifierKey] === element.identifier));
            }
        };
        
        findTagAndSetView(node.data.element, Tag.SoftwareSystem.name, Tag.Container.name, 'softwareSystemIdentifier', workspace.views.containers);
        findTagAndSetView(node.data.element, Tag.Container.name, Tag.Component.name, 'containerIdentifier', workspace.views.components);
    }, [setView, workspace]);
    
    /* handling the user presence on the diagram */
    const { getViewport } = useReactFlow();
    const { others, setSelfPoint } = useUserPresence();

    const onMouseMove = useCallback((event) => {
        const mousePoint = { x: event.clientX, y: event.clientY };
        const viewport = getViewport();
        const normalizedPoint = normalizePoint(viewport, mousePoint);
        setSelfPoint(normalizedPoint);
    }, [setSelfPoint, getViewport]);

    return (
        <ReactFlow
            connectionMode={ConnectionMode.Loose}
            fitView
            fitViewOptions={{ padding: 0.2, duration: 500, maxZoom: 5, minZoom: 0.1 }}
            edges={edges}
            edgeTypes={EdgeTypes}
            nodes={nodes}
            nodeTypes={NodeTypes}
            proOptions={{ hideAttribution: true }}
            snapGrid={[40, 40]}
            onNodeDoubleClick={onNodeDoubleClick}
            onNodeDragStop={onNodeDragStop}
            onNodesDelete={onNodesDelete}
            onMouseMove={onMouseMove}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
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
