import { ReactFlowProvider } from "@reactflow/core";
import { Workspace } from "@structurizr/dsl";
import { Viewport } from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import { ModelView } from "../components";

export const WorkspaceModeling: FC<PropsWithChildren<{
    workspace: Workspace;
    viewport?: Viewport;
    onWorkspaceChange?: (workspace: Workspace) => void;
    onWorkspaceViewportChange?: (viewport: Viewport) => void;
}>> = ({
    children,
    workspace,
    viewport,
    onWorkspaceChange,
    onWorkspaceViewportChange
}) => {
    return (
        <ReactFlowProvider>
            <ModelView
                workspace={workspace}
                onWorkspaceChange={onWorkspaceChange}
            >
                {children}
            </ModelView>
        </ReactFlowProvider>
    )
}