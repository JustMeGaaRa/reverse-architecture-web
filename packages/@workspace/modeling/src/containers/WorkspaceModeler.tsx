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
import { ModelView } from "../containers";

export const WorkspaceModeler: FC<PropsWithChildren<{
    workspace: IWorkspace;
}>> = ({
    children,
    workspace,
}) => {
    const store = useWorkspaceStore();
    
    return (
        <ReactFlowProvider>
            <WorkspaceStoreUpdater
                workspace={workspace}
            />

            <ModelView
                model={store.workspace.model}
            />

            {children}
        </ReactFlowProvider>
    )
}