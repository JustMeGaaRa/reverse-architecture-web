import {
    GenericView,
    Workspace,
} from "@justmegaara/structurizr-dsl";
import {
    NodeMouseHandler,
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
    initialView?: GenericView;
    onNodesDoubleClick?: NodeMouseHandler;
}>> = ({
    children,
    workspace,
    initialView,
    onNodesDoubleClick
}) => {
    const { nodes, edges } = useSelectedView();

    return (
        <>
            <WorkspaceStoreUpdater
                workspace={workspace}
                selectedView={initialView}
            />
            <WorkspaceRenderer
                nodes={nodes}
                edges={edges}
                onNodesDoubleClick={onNodesDoubleClick}
            >
                {children}
            </WorkspaceRenderer>
        </>
    )
}