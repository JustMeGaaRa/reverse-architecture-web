import {
    ElementType,
    IConfiguration,
    IModel,
    ISystemContextView,
    SystemContextViewStrategy,
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
    useSystemContextView,
    useViewportUtils,
    useWorkspaceToolbarStore
} from "../hooks";
import { getReactFlowObject } from "../utils";

export const SystemContextView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: ISystemContextView;
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
        addRelationship,
    } = useSystemContextView(view.identifier);

    useEffect(() => {
        const updateReactFlow = async () => {
            const strategy = new SystemContextViewStrategy(model, view);
            const reactFlowObject = await getReactFlowObject(strategy, model, configuration, view);
            setNodes(reactFlowObject.nodes);
            setEdges(reactFlowObject.edges);
        }
        
        updateReactFlow();
    }, [model, configuration, view, setNodes, setEdges]);

    // NOTE: following handlers are used to add elements when respective mode is enabled
    const { isAddingElementEnabled, addingElementType } = useWorkspaceToolbarStore();
    const { getViewportPoint } = useViewportUtils();
    
    const addElement = useCallback((elementType: ElementType, point: any, boxOffset: DOMRect, parentId?: string) => {
        if (isAddingElementEnabled) {
            const targetPoint = { x: point.clientX - boxOffset.left, y: point.clientY - boxOffset.top };
            const viewportPoint = getViewportPoint(targetPoint);

            switch (elementType) {
                case ElementType.Group:
                    addGroup(viewportPoint);
                    break;
                case ElementType.SoftwareSystem:
                    addSoftwareSystem(viewportPoint, parentId);
                    break;
                case ElementType.Person:
                    addPerson(viewportPoint, parentId);
                    break;
            }
        }
    }, [isAddingElementEnabled, getViewportPoint, addGroup, addSoftwareSystem, addPerson]);

    const handleOnNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        const mousePoint = { clientX: event.clientX, clientY: event.clientY};
        addElement(addingElementType, mousePoint, event.currentTarget.getBoundingClientRect(), node.id);
    }, [addElement, addingElementType]);

    const handleOnPaneClick = useCallback((event: React.MouseEvent) => {
        const mousePoint = { clientX: event.clientX, clientY: event.clientY};
        addElement(addingElementType, mousePoint, event.currentTarget.getBoundingClientRect());
    }, [addElement, addingElementType]);

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