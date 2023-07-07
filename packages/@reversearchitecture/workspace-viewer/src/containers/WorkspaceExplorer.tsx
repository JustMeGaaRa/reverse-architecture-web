import {
    IViewDefinition,
    Tag,
    ViewType,
    Workspace,
} from "@structurizr/dsl";
import {
    NodeMouseHandler,
    OnInit,
    ReactFlowInstance,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from "react";
import { WorkspaceRenderer, WorkspaceStoreUpdater } from "../containers";
import { getViewGraph } from "../hooks";
import { getViewportPoint } from "../utils";

type MousePosition = {
    relativePoint: { x: number, y: number },
    viewportPoint: { x: number, y: number },
}

type MouseMoveEventHandler = (event: MousePosition) => void;

export const WorkspaceExplorer: FC<PropsWithChildren<{
    workspace?: Workspace;
    selectedView?: IViewDefinition;
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
    const [ reactFlow, setReactFlow ] = useState<ReactFlowInstance>();
    const [ nodes, setNodes, onNodesChange ] = useNodesState([]);
    const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);

    useEffect(() => {
        getViewGraph(workspace, selectedView)
            .then(({ nodes, edges }) => {
                setNodes(nodes);
                setEdges(edges);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [workspace, selectedView, setNodes, setEdges]);

    const handleOnIntialize = useCallback((instance: ReactFlowInstance) => {
        setReactFlow(instance);
        onInitialize?.(instance);
    }, [onInitialize]);

    const handleOnNodeDragStop = useCallback((event: React.MouseEvent, node: any, nodes: any[]) => {
        onNodeDragStop?.(event, node);
    }, [onNodeDragStop]);

    const handleOnMouseMove = useCallback((event: any) => {
        if (reactFlow) {
            const boundingBox = event.currentTarget.getBoundingClientRect();
            const pointOnTarget = { x: event.clientX - boundingBox.left, y: event.clientY - boundingBox.top };
            const pointOnViewport = getViewportPoint(reactFlow.getViewport(), pointOnTarget);
            onMouseMove?.({ relativePoint: pointOnTarget, viewportPoint: pointOnViewport });
        }
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
                onNodesDoubleClick={onNodesDoubleClick}
                onMouseMove={handleOnMouseMove}
            >
                {children}
            </WorkspaceRenderer>
        </ReactFlowProvider>
    )
}