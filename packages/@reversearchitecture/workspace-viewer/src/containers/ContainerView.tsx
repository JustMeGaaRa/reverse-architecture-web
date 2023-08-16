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
} from "react";
import { WorkspaceViewRenderer } from "../containers";
import {
    useContainerView,
    useViewportUtils,
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

    useEffect(() => {
        const updateReactFlow = async () => {
            const strategy = new ContainerViewStrategy(model, view);
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
                case ElementType.Container:
                    addContainer(viewportPoint, node.id);
                    break;
            }
        }
    }, [isAddingElementEnabled, addingElementType, getViewportPoint, addGroup, addContainer]);

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
            }
        }
    }, [isAddingElementEnabled, addingElementType, getViewportPoint, addSoftwareSystem, addPerson]);

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