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
    IComponentView,
    ComponentViewStrategy,
    IWorkspace,
    Workspace,
    Position,
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
    useComponentView,
    useAutoLayoutEffect
} from "../../hooks";

export const ComponentView: FC<PropsWithChildren<{
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
    const store = useWorkspace();
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new ComponentViewStrategy(workspace.model, view), [workspace, view]);
    const {
        isAddingElementEnabled,
        addingElementType
    } = useWorkspaceToolbarStore();
    const {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addContainer,
        addComponent,
        addRelationship,
        setElementPosition
    } = useComponentView(view.identifier);
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
                case ElementType.Component:
                    onWorkspaceChange?.(addComponent(pointRelativeToNode, groupId));
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
        addComponent
    ]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY };
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
                case ElementType.Container:
                    onWorkspaceChange?.(addContainer(pointTranslatedFromViewport));
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
        addContainer
    ]);

    const handleOnConnect = useCallback((connection: Connection) => {
        onWorkspaceChange?.(addRelationship(connection.source, connection.target));
    }, [addRelationship, onWorkspaceChange]);

    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        switch (sourceNode.data?.element?.type) {
            case ElementType.Person:
                onWorkspaceChange?.(addPerson(position));
                onWorkspaceChange?.(addRelationship(sourceNode.id, ""))
            case ElementType.SoftwareSystem:
                onWorkspaceChange?.(addSoftwareSystem(position));
                onWorkspaceChange?.(addRelationship(sourceNode.id, ""))
                break;
            case ElementType.Container:
                onWorkspaceChange?.(addContainer(position));
                onWorkspaceChange?.(addRelationship(sourceNode.id, ""))
                break;
            case ElementType.Component:
                onWorkspaceChange?.(addComponent(position, sourceNode.parentNode));
                onWorkspaceChange?.(addRelationship(sourceNode.id, ""))
                break;
        }
    }, [onWorkspaceChange, addPerson, addRelationship, addSoftwareSystem, addContainer, addComponent]);

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