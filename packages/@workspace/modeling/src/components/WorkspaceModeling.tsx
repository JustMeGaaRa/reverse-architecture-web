import { ReactFlowProvider } from "@reactflow/core";
import { Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { ModelView } from "../components";

export const WorkspaceModeling: FC<PropsWithChildren<{
    workspace: Workspace;
    onWorkspaceChange?: (workspace: Workspace) => void;
}>> = ({
    children,
    workspace,
    onWorkspaceChange
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