import {
    ElementType,
    IConfiguration,
    IModel,
    IContainerView,
    ContainerViewStrategy,
} from "@structurizr/dsl";
import {
    Connection,
    Node,
    NodeMouseHandler,
    useEdgesState,
    useNodesState,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
} from "react";
import { WorkspaceViewRenderer } from "../containers";
import {
    useAutoLayoutEffect,
    useContainerView,
    useViewNavigation,
    useViewportUtils,
    useViewRenderingEffect,
    useWorkspaceToolbarStore
} from "../hooks";

export const ContainerView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: IContainerView;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    model,
    configuration,
    view,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new ContainerViewStrategy(model, view), [model, view]);
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
    const { zoomIntoElement } = useViewNavigation();
    const { getViewportPoint } = useViewportUtils();

    useAutoLayoutEffect();
    useViewRenderingEffect(strategy);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        setElementPosition(node.data.element.identifier, node.position);
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop, setElementPosition]);

    const handleOnDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
        zoomIntoElement(node.data.element);
        onNodesDoubleClick?.(event, node);
    }, [onNodesDoubleClick, zoomIntoElement]);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY};
            const targetPoint = {
                x: mousePoint.x - parentOffset.left,
                y: mousePoint.y - parentOffset.top
            };
            const viewportPoint = getViewportPoint(targetPoint);
            const viewportTargetPoint = {
                x: viewportPoint.x - node.positionAbsolute.x,
                y: viewportPoint.y - node.positionAbsolute.y
            };
            const groupId = node.data.element.type === ElementType.Group ? node.id : undefined;

            switch (addingElementType) {
                case ElementType.Group:
                    addGroup(viewportTargetPoint);
                    break;
                case ElementType.Container:
                    addContainer(viewportTargetPoint, groupId);
                    break;
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        getViewportPoint,
        addGroup,
        addContainer
    ]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY};
            const targetPoint = {
                x: mousePoint.x - parentOffset.left,
                y: mousePoint.y - parentOffset.top
            };
            const viewportPoint = getViewportPoint(targetPoint);

            switch (addingElementType) {
                case ElementType.SoftwareSystem:
                    addSoftwareSystem(viewportPoint);
                    break;
                case ElementType.Person:
                    addPerson(viewportPoint);
                    break;
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        getViewportPoint,
        addSoftwareSystem,
        addPerson
    ]);

    const handleOnConnect = useCallback((connection: Connection) => {
        addRelationship(connection.source, connection.target);
    }, [addRelationship]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDragStop={handleOnNodeDragStop}
            onNodesDoubleClick={handleOnDoubleClick}
            onNodeClick={handleOnNodeClick}
            // onMouseMove={handleOnMouseMove}
            onPaneClick={handleOnPaneClick}
            onConnect={handleOnConnect}
        >
            {children}
        </WorkspaceViewRenderer>
    )
}