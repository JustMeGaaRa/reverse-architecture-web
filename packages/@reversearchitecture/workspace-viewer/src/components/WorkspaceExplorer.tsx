import {
    IView,
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
    initialView?: IView;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    initialView,
    onNodesDoubleClick
}) => {
    const { nodes, edges, onNodesChange, onEdgesChange } = useSelectedViewGraph();
    const { navigate } = useWorkspaceNavigation();

    const handleOnDoubleClick = useCallback((event: React.MouseEvent, node: any) => {
        const element = node.data.element;

        // do not handle the click for component elements as there is no such view type
        if (element.tags.some(tag => tag.name === "Person")
            || element.tags.some(tag => tag.name === "Component")) {
            return;
        }

        navigate({
            identifier: element.identifier,
            type: element.tags.some(tag => tag.name === "Software System")
                ? ViewType.Container
                : ViewType.Component,
            title: element.name
        });

        onNodesDoubleClick?.(event, node);
    }, [navigate, onNodesDoubleClick]);

    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
                selectedView={initialView}
            />
            <WorkspaceRenderer
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodesDoubleClick={handleOnDoubleClick}
            >
                {children}
            </WorkspaceRenderer>
        </ReactFlowProvider>
    )
}