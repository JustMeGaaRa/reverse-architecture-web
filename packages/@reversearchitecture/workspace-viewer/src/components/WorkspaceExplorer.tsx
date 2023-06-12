import {
    IView,
    Tag,
    ViewType,
    Workspace,
} from "@structurizr/dsl";
import {
    NodeMouseHandler,
    OnInit,
    ReactFlowInstance,
    ReactFlowProvider,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useRef,
    useState,
} from "react";
import { useReactFlowSelectedView } from "../hooks/useReactFlowSelectedView";
import { WorkspaceRenderer } from "./WorkspaceRenderer";
import { WorkspaceStoreUpdater } from "./WorkspaceStoreUpdater";
import { useWorkspaceNavigation } from "../hooks/useWorkspaceNavigation";
import { getViewportPoint } from "../utils/ReactFlow";

type MousePosition = {
    relativePoint: { x: number, y: number },
    viewportPoint: { x: number, y: number },
}

type MouseMoveEventHandler = (event: MousePosition) => void;

export const WorkspaceExplorer: FC<PropsWithChildren<{
    workspace?: Workspace;
    selectedView?: IView;
    onInitialize?: OnInit;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
    onMouseMove?: MouseMoveEventHandler;
}>> = ({
    children,
    workspace,
    selectedView,
    onInitialize,
    onNodeDragStop,
    onNodesDoubleClick,
    onMouseMove
}) => {
    const { nodes, edges, onNodesChange, onEdgesChange } = useReactFlowSelectedView();
    const { navigate } = useWorkspaceNavigation();
    const [ reactFlow, setReactFlow ] = useState<ReactFlowInstance>();

    const handleOnIntialize = useCallback((instance: ReactFlowInstance) => {
        setReactFlow(instance);
        onInitialize?.(instance);
    }, [onInitialize]);

    const handleOnDoubleClick = useCallback((event: React.MouseEvent, node: any) => {
        const element = node.data.element;

        // do not handle the click for component elements as there is no such view type
        if (!element.tags.some(tag => tag.name === Tag.Person.name || tag.name === Tag.Component.name)) {
            navigate({
                identifier: element.identifier,
                type: element.tags.some(tag => tag.name === Tag.SoftwareSystem.name)
                    ? ViewType.Container
                    : ViewType.Component,
                title: element.name
            });
        }

        onNodesDoubleClick?.(event, node);
    }, [navigate, onNodesDoubleClick]);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop]);

    const handleOnMouseMove = useCallback((event: any) => {
        const boundingBox = event.currentTarget.getBoundingClientRect();
        const pointOnTarget = { x: event.clientX - boundingBox.left, y: event.clientY - boundingBox.top };
        const pointOnViewport = getViewportPoint(reactFlow.getViewport(), pointOnTarget);
        onMouseMove?.({ relativePoint: pointOnTarget, viewportPoint: pointOnViewport });
    }, [reactFlow, onMouseMove]);

    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
                selectedView={selectedView}
            />
            <WorkspaceRenderer
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onInitialize={handleOnIntialize}
                onNodeDragStop={handleOnNodeDragStop}
                onNodesDoubleClick={handleOnDoubleClick}
                onMouseMove={handleOnMouseMove}
            >
                {children}
            </WorkspaceRenderer>
        </ReactFlowProvider>
    )
}