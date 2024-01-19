import { Background, BackgroundVariant } from "@reactflow/background";
import {
    Connection,
    Node,
    NodeMouseHandler,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@reactflow/core";
import {
    ElementType,
    IConfiguration,
    IModel,
    ISystemContextView,
    IWorkspace,
    Position,
    SystemContextViewStrategy,
    Workspace,
} from "@structurizr/dsl";
import {
    WorkspaceViewRenderer,
    useWorkspaceToolbarStore,
    getAbsolutePoint,
    CurrentView,
    useWorkspace
} from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
} from "react";
import {
    ReactFlowEdgeTypes,
    ElementDiagramFlowControls,
    ElementOptionsToolbar,
    ElementZoomControlsBackground,
    ReactFlowNodeTypes
} from "../../components";
import {
    useViewRenderingEffect,
    useSystemContextView,
    useAutoLayoutEffect
} from "../../hooks";

export const SystemContextView: FC<PropsWithChildren<{
    workspace: IWorkspace;
    view: ISystemContextView;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    view,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const store = useWorkspace();
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new SystemContextViewStrategy(workspace.model, view), [workspace, view]);
    const {
        enabledTool,
        addingElementType
    } = useWorkspaceToolbarStore();
    const {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addRelationship,
        setElementPosition
    } = useSystemContextView(view.identifier);
    const { getViewport } = useReactFlow();

    useViewRenderingEffect(workspace, strategy);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        setElementPosition(node.data.element.identifier, node.position);
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop, setElementPosition]);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (reactFlowRef.current && enabledTool === "adding-element") {
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

            switch (addingElementType) {
                case ElementType.SoftwareSystem:
                    addSoftwareSystem(pointRelativeToNode, node.id)
                    break;
                case ElementType.Person:
                    addPerson(pointRelativeToNode, node.id)
                    break;
            }
        }
    }, [
        reactFlowRef,
        addingElementType,
        enabledTool,
        getViewport,
        addSoftwareSystem,
        addPerson
    ]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (reactFlowRef.current && enabledTool === "adding-element") {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY };
            const pointRelativeToViewport = {
                x: mousePoint.x - parentOffset.left,
                y: mousePoint.y - parentOffset.top
            };
            const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);

            switch (addingElementType) {
                case ElementType.Group:
                    addGroup(pointTranslatedFromViewport)
                    break;
                case ElementType.SoftwareSystem:
                    addSoftwareSystem(pointTranslatedFromViewport)
                    break;
                case ElementType.Person:
                    addPerson(pointTranslatedFromViewport)
                    break;
            }
        }
    }, [
        reactFlowRef,
        addingElementType,
        enabledTool,
        getViewport,
        addGroup,
        addSoftwareSystem,
        addPerson
    ]);

    const handleOnConnect = useCallback((connection: Connection) => {
        addRelationship(connection.source, connection.target);
    }, [addRelationship]);

    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        switch (sourceNode.data?.element?.type) {
            case ElementType.Person:
                const person = addPerson(position, sourceNode.parentNode);
                const personRelationship = addRelationship(sourceNode.data?.element.identifier, person.identifier);
            case ElementType.SoftwareSystem:
                const softwareSystem = addSoftwareSystem(position, sourceNode.parentNode);
                const softwareSystemRelationship = addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                break;
        }
    }, [addPerson, addSoftwareSystem, addRelationship]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={ReactFlowNodeTypes}
            edges={edges}
            edgeTypes={ReactFlowEdgeTypes}
            isReadonly={store.workspace === null || store.workspace === undefined}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={handleOnNodeDragStop}
            onNodesDoubleClick={onNodesDoubleClick}
            onNodeClick={handleOnNodeClick}
            onPaneClick={handleOnPaneClick}
            onConnect={handleOnConnect}
        >
            <Background
                gap={50}
                size={2}
                variant={BackgroundVariant.Dots}
            />
            <ElementOptionsToolbar />
            <ElementDiagramFlowControls
                workspace={workspace}
                onHandleClick={handleOnFlowClick}
            />
            <ElementZoomControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}