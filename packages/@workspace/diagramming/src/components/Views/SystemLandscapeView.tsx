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
    ISystemLandscapeView,
    IWorkspace,
    SystemLandscapeViewStrategy,
} from "@structurizr/dsl";
import {
    WorkspaceViewRenderer,
    useAutoLayoutEffect,
    useWorkspaceToolbarStore,
    getAbsolutePoint
} from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
} from "react";
import {
    EdgeTypes,
    ElementFlowControls,
    ElementOptionsToolbar,
    ElementZoomControlsBackground,
    ReactFlowNodeTypes
} from "../../components";
import {
    useViewRenderingEffect,
    useViewNavigation,
    useSystemLandscapeView
} from "../../hooks";

export const SystemLandscapeView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: ISystemLandscapeView;
    onWorkspaceChange?: (workspace: IWorkspace) => void;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    model,
    view,
    onWorkspaceChange,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new SystemLandscapeViewStrategy(model, view), [model, view]);
    const {
        isCommentAddingEnabled,
        isAddingElementEnabled,
        addingElementType
    } = useWorkspaceToolbarStore();
    const {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addRelationship,
        setElementPosition
    } = useSystemLandscapeView();
    const { zoomIntoElement, setMousePosition } = useViewNavigation();
    const { getViewport } = useReactFlow();

    useAutoLayoutEffect();
    useViewRenderingEffect(strategy);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        onWorkspaceChange?.(setElementPosition(node.data.element.identifier, node.position));
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop, onWorkspaceChange, setElementPosition]);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
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
            const groupId = node.data.element.type === ElementType.Group ? node.id : undefined;

            switch (addingElementType) {
                case ElementType.SoftwareSystem:
                    onWorkspaceChange?.(addSoftwareSystem(pointRelativeToNode, groupId));
                    break;
                case ElementType.Person:
                    onWorkspaceChange?.(addPerson(pointRelativeToNode, groupId));
                    break;
            }
        }
    }, [
        reactFlowRef,
        addingElementType,
        isAddingElementEnabled,
        onWorkspaceChange,
        getViewport,
        addSoftwareSystem,
        addPerson
    ]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        const parentOffset = reactFlowRef.current.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const pointRelativeToViewport = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);

        if (reactFlowRef.current && isAddingElementEnabled) {

            switch (addingElementType) {
                case ElementType.Group:
                    onWorkspaceChange?.(addGroup(pointTranslatedFromViewport));
                    break;
                case ElementType.SoftwareSystem:
                    onWorkspaceChange?.(addSoftwareSystem(pointTranslatedFromViewport));
                    break;
                case ElementType.Person:
                    onWorkspaceChange?.(addPerson(pointTranslatedFromViewport));
                    break;
            }
        }

        if (isCommentAddingEnabled) {
            // TODO: move the logic of adding comments outside of component
        }
    }, [
        reactFlowRef,
        addingElementType,
        isAddingElementEnabled,
        isCommentAddingEnabled,
        onWorkspaceChange,
        getViewport,
        addGroup,
        addSoftwareSystem,
        addPerson
    ]);

    // NOTE: used to track the user cursor position
    const handleOnMouseMove = useCallback((event: any) => {
        const parentOffset = reactFlowRef.current.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const pointRelativeToViewport = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);
        setMousePosition(mousePoint);
    }, [reactFlowRef, getViewport, setMousePosition]);

    const handleOnConnect = useCallback((connection: Connection) => {
        onWorkspaceChange?.(addRelationship(connection.source, connection.target));
    }, [addRelationship, onWorkspaceChange]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={ReactFlowNodeTypes}
            edges={edges}
            edgeTypes={EdgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={handleOnNodeDragStop}
            onNodesDoubleClick={onNodesDoubleClick}
            onNodeClick={handleOnNodeClick}
            onMouseMove={handleOnMouseMove}
            onPaneClick={handleOnPaneClick}
            onConnect={handleOnConnect}
        >
            <ElementOptionsToolbar />
            <ElementFlowControls />
            <ElementZoomControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}