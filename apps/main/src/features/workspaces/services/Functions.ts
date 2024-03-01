import { Workspace } from "structurizr";
import { WorkspaceApi } from "./WorkspaceApi";


export const loadWorkspaceContent = async (workspaceId: string) => {
    const workspaceApi = new WorkspaceApi();
    const controller = new AbortController();

    const structurizr = await workspaceApi.getWorkspaceContent(workspaceId, { controller });
    const metadata = await workspaceApi.getWorkspaceMetadata(workspaceId, { controller });

    return { structurizr, metadata };
}

// TODO: check if workspace has been modified
export const saveWorkspaceContent = async (workspaceId: string, workspace: Workspace) => {
    // return await workspaceApi.saveWorkspaceContent(workspaceId, workspace);
    return workspace;
}