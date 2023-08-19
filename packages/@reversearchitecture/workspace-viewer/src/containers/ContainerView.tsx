import {
    ElementType,
    IConfiguration,
    IModel,
    IContainerView,
    ContainerViewStrategy,
} from "@structurizr/dsl";
import {
    Node,
    NodeMouseHandler,
    useEdgesState,
    useNodesState,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
} from "react";
import { WorkspaceViewRenderer } from "../containers";
import {
    useAutoLayoutEffect,
    useContainerView,
    useViewportUtils,
    useWorkspace,
    useWorkspaceToolbarStore
} from "../hooks";
import { getReactFlowObject } from "../utils";

export const ContainerView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: IContainerView;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    model,
    configuration,
    view,
    onNodesDoubleClick
}) => {
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
    
    const {
        addGroup,
        addSoftwareSystem,
        addPerson,
        addContainer,
        addRelationship,
    } = useContainerView(view.identifier);

    useAutoLayoutEffect();

    useEffect(() => {
        const strategy = new ContainerViewStrategy(model, view);
        const reactFlowObject = getReactFlowObject(strategy, model, configuration, view);
        setNodes(reactFlowObject.nodes);
        setEdges(reactFlowObject.edges);
    }, [model, configuration, view, setNodes, setEdges]);
    
    const { zoomIntoElement } = useWorkspace();
    const handleOnDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
        zoomIntoElement(node.data.element);
        onNodesDoubleClick?.(event, node);
    }, [onNodesDoubleClick, zoomIntoElement]);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const reactFlowRef = useRef(null)
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { getViewportPoint } = useViewportUtils();

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

            switch (addingElementType) {
                case ElementType.Group:
                    addGroup(viewportTargetPoint);
                    break;
                case ElementType.Container:
                    addContainer(viewportTargetPoint, node.id);
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

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onNodeDragStop={handleOnNodeDragStop}
            onNodesDoubleClick={handleOnDoubleClick}
            onNodeClick={handleOnNodeClick}
            // onMouseMove={handleOnMouseMove}
            onPaneClick={handleOnPaneClick}
        >
            {children}
        </WorkspaceViewRenderer>
    )
}