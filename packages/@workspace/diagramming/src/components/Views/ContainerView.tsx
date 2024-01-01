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
    IContainerView,
    ContainerViewStrategy,
    IWorkspace,
    Workspace,
} from "@structurizr/dsl";
import {
    WorkspaceViewRenderer,
    useWorkspaceToolbarStore,
    getAbsolutePoint,
    CurrentView,
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
    ElementFlowControls,
    ElementOptionsToolbar,
    ElementZoomControlsBackground,
    ReactFlowNodeTypes
} from "../../components";
import {
    useViewRenderingEffect,
    useContainerView,
    useAutoLayoutEffect
} from "../../hooks";

export const ContainerView: FC<PropsWithChildren<{
    workspace: Workspace;
    view: CurrentView;
    onWorkspaceChange?: (workspace: IWorkspace) => void;
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
    const strategy = useMemo(() => new ContainerViewStrategy(workspace.model, view), [workspace, view]);
    const {
        isAddingElementEnabled,
        addingElementType
    } = useWorkspaceToolbarStore();
    const {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addContainer,
        addRelationship,
        setElementPosition
    } = useContainerView(view.identifier);
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
            const mousePoint = { x: event.clientX, y: event.clientY};
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
                case ElementType.Group:
                    onWorkspaceChange?.(addGroup(pointRelativeToNode));
                    break;
                case ElementType.Container:
                    onWorkspaceChange?.(addContainer(pointRelativeToNode, groupId));
                    break;
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        onWorkspaceChange,
        getViewport,
        addGroup,
        addContainer,
    ]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY};
            const pointRelativeToViewport = {
                x: mousePoint.x - parentOffset.left,
                y: mousePoint.y - parentOffset.top
            };
            const pointTranslatedFromViewport = getAbsolutePoint(getViewport(), pointRelativeToViewport);

            switch (addingElementType) {
                case ElementType.SoftwareSystem:
                    onWorkspaceChange?.(addSoftwareSystem(pointTranslatedFromViewport));
                    break;
                case ElementType.Person:
                    onWorkspaceChange?.(addPerson(pointTranslatedFromViewport));
                    break;
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        onWorkspaceChange,
        getViewport,
        addSoftwareSystem,
        addPerson,
    ]);

    const handleOnConnect = useCallback((connection: Connection) => {
        onWorkspaceChange?.(addRelationship(connection.source, connection.target));
    }, [addRelationship, onWorkspaceChange]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={ReactFlowNodeTypes}
            edges={edges}
            edgeTypes={ReactFlowEdgeTypes}
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
            <ElementFlowControls workspace={workspace} />
            <ElementZoomControlsBackground />
            {children}
        </WorkspaceViewRenderer>
    )
}