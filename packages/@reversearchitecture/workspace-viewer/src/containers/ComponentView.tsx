import {
    ElementType,
    IConfiguration,
    IModel,
    IComponentView,
    ComponentViewStrategy,
} from "@structurizr/dsl";
import {
    Node,
    NodeMouseHandler,
    useEdgesState,
    useNodesState,
    useReactFlow,
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
    useComponentView,
    useViewportUtils,
    useWorkspaceToolbarStore
} from "../hooks";
import { getReactFlowObject } from "../utils";

export const ComponentView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: IComponentView;
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
        addComponent,
        addRelationship,
    } = useComponentView(view.identifier);

    useEffect(() => {
        const updateReactFlow = async () => {
            const strategy = new ComponentViewStrategy(model, view);
            const reactFlowObject = await getReactFlowObject(strategy, model, configuration, view);
            setNodes(reactFlowObject.nodes);
            setEdges(reactFlowObject.edges);
        }

        updateReactFlow();
    }, [model, configuration, view, setNodes, setEdges]);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const reactFlowRef = useRef(null)
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { getViewportPoint } = useViewportUtils();
    
    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY};
            const targetPoint = { x: mousePoint.x - parentOffset.left, y: mousePoint.y - parentOffset.top };
            const viewportPoint = getViewportPoint(targetPoint);
            const viewportTargetPoint = { x: viewportPoint.x - node.positionAbsolute.x, y: viewportPoint.y - node.positionAbsolute.y };

            switch (addingElementType) {
                case ElementType.Group:
                    addGroup(viewportTargetPoint);
                    break;
                case ElementType.Component:
                    addComponent(viewportTargetPoint, node.id);
                    break;
            }
        }
    }, [reactFlowRef, isAddingElementEnabled, addingElementType, getViewportPoint, addGroup, addComponent]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (reactFlowRef.current && isAddingElementEnabled) {
            const parentOffset = reactFlowRef.current.getBoundingClientRect();
            const mousePoint = { x: event.clientX, y: event.clientY};
            const targetPoint = { x: mousePoint.x - parentOffset.left, y: mousePoint.y - parentOffset.top };
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
    }, [reactFlowRef, isAddingElementEnabled, addingElementType, getViewportPoint, addSoftwareSystem, addPerson, addContainer]);

    return (
        <WorkspaceViewRenderer
            ref={reactFlowRef}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onNodeDragStop={handleOnNodeDragStop}
            onNodesDoubleClick={onNodesDoubleClick}
            onNodeClick={handleOnNodeClick}
            // onMouseMove={handleOnMouseMove}
            onPaneClick={handleOnPaneClick}
        >
            {children}
        </WorkspaceViewRenderer>
    )
}