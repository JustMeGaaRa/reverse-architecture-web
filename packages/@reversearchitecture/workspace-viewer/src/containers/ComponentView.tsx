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
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
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
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { getViewportPoint } = useViewportUtils();
    
    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        if (isAddingElementEnabled) {
            const boxOffset = event.currentTarget.getBoundingClientRect();
            const mousePoint = { clientX: event.clientX, clientY: event.clientY};
            const targetPoint = { x: mousePoint.clientX - boxOffset.left, y: mousePoint.clientY - boxOffset.top };
            const viewportPoint = getViewportPoint(targetPoint);

            switch (addingElementType) {
                case ElementType.Group:
                    addGroup(viewportPoint);
                    break;
                case ElementType.Component:
                    addComponent(viewportPoint, node.id);
                    break;
            }
        }
    }, [isAddingElementEnabled, addingElementType, getViewportPoint, addGroup, addComponent]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        if (isAddingElementEnabled) {
            const boxOffset = event.currentTarget.getBoundingClientRect();
            const mousePoint = { clientX: event.clientX, clientY: event.clientY};
            const targetPoint = { x: mousePoint.clientX - boxOffset.left, y: mousePoint.clientY - boxOffset.top };
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
    }, [isAddingElementEnabled, addingElementType, getViewportPoint, addSoftwareSystem, addPerson, addContainer]);

    return (
        <WorkspaceViewRenderer
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