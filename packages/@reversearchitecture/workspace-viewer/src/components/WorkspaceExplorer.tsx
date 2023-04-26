import {
    IView,
    Workspace,
} from "@structurizr/dsl";
import {
    NodeMouseHandler, ReactFlowProvider,
} from "@reactflow/core";
import {
    FC,
    PropsWithChildren
} from "react";
import { useSelectedView } from "../hooks/useSelectedView";
import { WorkspaceRenderer } from "./WorkspaceRenderer";
import { WorkspaceStoreUpdater } from "./WorkspaceStoreUpdater";

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
    const { nodes, edges, onNodesChange, onEdgesChange } = useSelectedView();

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
                onNodesDoubleClick={onNodesDoubleClick}
            >
                {children}
            </WorkspaceRenderer>
        </ReactFlowProvider>
    )
}