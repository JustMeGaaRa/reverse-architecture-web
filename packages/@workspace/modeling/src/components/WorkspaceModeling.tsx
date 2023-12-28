import { ReactFlowProvider } from "@reactflow/core";
import { IWorkspace } from "@structurizr/dsl";
import { useWorkspace } from "@workspace/core";
import { FC, PropsWithChildren } from "react";
import { ModelView } from "../components";

export const WorkspaceModeling: FC<PropsWithChildren<{
    workspace: IWorkspace;
    onWorkspaceChange?: (workspace: IWorkspace) => void;
}>> = ({
    children,
    workspace,
    onWorkspaceChange
}) => {
    const store = useWorkspace();
    
    return (
        <ReactFlowProvider>
            <ModelView
                model={store.workspace.model}
                onWorkspaceChange={onWorkspaceChange}
            >
                {children}
            </ModelView>
        </ReactFlowProvider>
    )
}