import {
    IView,
    Tag,
    ViewType,
    Workspace,
} from "@structurizr/dsl";
import {
    NodeMouseHandler, ReactFlowProvider,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren,
    useCallback
} from "react";
import { useSelectedViewGraph } from "../hooks/useSelectedViewGraph";
import { WorkspaceRenderer } from "./WorkspaceRenderer";
import { WorkspaceStoreUpdater } from "./WorkspaceStoreUpdater";
import { useWorkspaceNavigation } from "../hooks/useWorkspaceNavigation";

export const WorkspaceExplorer: FC<PropsWithChildren<{
    workspace?: Workspace;
    selectedView?: IView;
    onNodeDragStop?: NodeMouseHandler;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    selectedView,
    onNodeDragStop,
    onNodesDoubleClick
}) => {
    const { nodes, edges, onNodesChange, onEdgesChange } = useSelectedViewGraph();
    const { navigate } = useWorkspaceNavigation();

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
                onNodeDragStop={handleOnNodeDragStop}
                onNodesDoubleClick={handleOnDoubleClick}
            >
                {children}
            </WorkspaceRenderer>
        </ReactFlowProvider>
    )
}