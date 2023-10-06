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
    DeploymentViewStrategy,
    IDeploymentView,
} from "@structurizr/dsl";
import {
    WorkspaceViewRenderer,
    useAutoLayoutEffect,
    useViewNavigation,
    useViewportUtils,
    useViewRenderingEffect,
    useWorkspaceToolbarStore
} from "@workspace/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from "react";
import { useDeploymentView } from "../hooks";

export const DeploymentView: FC<PropsWithChildren<{
    model: IModel;
    configuration: IConfiguration;
    view: IDeploymentView;
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
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
    const reactFlowRef = useRef(null);
    const strategy = useMemo(() => new DeploymentViewStrategy(model, view, view["environment"]), [model, view]);
    const {
        isAddingElementEnabled,
        addingElementType
    } = useWorkspaceToolbarStore();
    const {
        addDeploymentNode,
        addInfrastructureNode,
        addSoftwareSystemInstance,
        addContainerInstance,
        addRelationship,
        setElementPosition
    } = useDeploymentView(view.identifier, view.environment);
    const { getViewportPoint } = useViewportUtils();

    useAutoLayoutEffect();
    useViewRenderingEffect(strategy);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        setElementPosition(node.data.element.identifier, node.position);
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop, setElementPosition]);

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

            switch (addingElementType) {
                // TODO: add element based on type
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        getViewportPoint,
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
                // TODO: add element based on type
            }
        }
    }, [
        reactFlowRef,
        isAddingElementEnabled,
        addingElementType,
        getViewportPoint,
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
            onNodesDoubleClick={onNodesDoubleClick}
            onNodeClick={handleOnNodeClick}
            // onMouseMove={handleOnMouseMove}
            onPaneClick={handleOnPaneClick}
            onConnect={handleOnConnect}
        >
            {children}
        </WorkspaceViewRenderer>
    )
}