import { IWorkspaceMetadata, Workspace } from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore } from "../store";

export const useWorkspace = () => {
    const { setWorkspace } = useWorkspaceStore();
    const { setSelectedView } = useWorkspaceStore();

    const applyWorkspace = useCallback((workspace: Workspace, metadata?: IWorkspaceMetadata) => {
        const updatedWorkspace = metadata
            ? Workspace.applyMetadata(workspace, metadata)
            : workspace;
        setWorkspace(updatedWorkspace);
        setSelectedView(updatedWorkspace.views.systemLandscape
            ?? updatedWorkspace.views.systemContexts[0]
            ?? updatedWorkspace.views.containers[0]
            ?? updatedWorkspace.views.components[0]
            ?? updatedWorkspace.views.deployments[0]);
    }, [setSelectedView, setWorkspace]);
    

    return {
        setWorkspace: applyWorkspace,
    }
}