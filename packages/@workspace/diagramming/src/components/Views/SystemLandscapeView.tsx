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
import { throttle } from "lodash";
import {
    EdgeTypes,
    ElementFlowControls,
    ElementOptionsToolbar,
    ElementZoomControlsBackground,
    ReactFlowNodeTypes
} from "../../components";
import {
    useViewRenderingEffect,
    useSystemLandscapeView,
    useAutoLayoutEffect
} from "../../hooks";

export const SystemLandscapeView: FC<PropsWithChildren<{
    workspace: Workspace;
    view: ISystemLandscapeView;
    onWorkspaceChange?: (workspace: Workspace) => void;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    view,
    onWorkspaceChange,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new SystemLandscapeViewStrategy(workspace.model, view), [workspace, view]);
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
    const store = useWorkspace();
    const { getViewport } = useReactFlow();

    useViewRenderingEffect(workspace, strategy);

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

    // TODO: move this callback handler outside of component and use hooks from useWorkspaceRoom to report user cursor position
    const handleOnMouseMove = useCallback(throttle((event: any) => {
        const parentOffset = reactFlowRef.current.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const pointRelativeToViewport = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);
        // setMousePosition(mousePoint);
    }, 100), [reactFlowRef, getViewport]);

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
            isReadonly={store.workspace === null || store.workspace === undefined}
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
            <ElementFlowControls workspace={workspace} />
            <ElementZoomControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}