import { ReactFlowProvider } from "@reactflow/core";
import {
    IViewDefinition,
    IWorkspace,
    IWorkspaceMetadata
} from "@structurizr/dsl";
import {
    useWorkspaceStore,
    WorkspaceStoreUpdater
} from "@workspace/core";
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
    const store = useWorkspaceStore();
    
    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
            />

            <ModelView
                model={store.workspace.model}
                onWorkspaceChange={onWorkspaceChange}
            />

            {children}
        </ReactFlowProvider>
    )
}