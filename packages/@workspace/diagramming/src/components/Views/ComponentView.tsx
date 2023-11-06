import {
    Connection,
    Node,
    NodeMouseHandler,
    useEdgesState,
    useNodesState,
} from "@reactflow/core";
import {
    ElementType,
    IConfiguration,
    IModel,
    IComponentView,
    ComponentViewStrategy,
    IWorkspace,
} from "@structurizr/dsl";
import {
    WorkspaceViewRenderer,
    useAutoLayoutEffect,
    useViewportUtils,
    useWorkspaceToolbarStore
} from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
} from "react";
import { EdgeTypes, NodeTypes } from "../../components";
import {
    useViewRenderingEffect,
    useViewNavigation,
    useComponentView
} from "../../hooks";

export const ComponentView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: IComponentView;
    onWorkspaceChange?: (workspace: IWorkspace) => void;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    model,
    configuration,
    view,
    onWorkspaceChange,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const [ nodes, , onNodesChange ] = useNodesState([]);
    const [ edges, , onEdgesChange ] = useEdgesState([]);
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new ComponentViewStrategy(model, view), [model, view]);
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
                case ElementType.Component:
                    addComponent(viewportTargetPoint, groupId);
                    break;
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        getViewportPoint,
        addGroup,
        addComponent
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
                case ElementType.Container:
                    addContainer(viewportPoint);
                    break;
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        getViewportPoint,
        addSoftwareSystem,
        addPerson,
        addContainer
    ]);

    const handleOnConnect = useCallback((connection: Connection) => {
        addRelationship(connection.source, connection.target);
    }, [addRelationship]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            nodeTypes={NodeTypes}
            edges={edges}
            edgeTypes={EdgeTypes}
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