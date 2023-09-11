import { WorkspaceInfo } from "../model";

export class WorkspaceApi {
    private readonly workspaces: Map<string, Array<WorkspaceInfo>>;

    constructor(
        public readonly baseUrl: string = ""
    ) {
        this.workspaces = new Map<string, WorkspaceInfo[]>();
    }

    async getWorkspaces(projectId: string): Promise<Array<WorkspaceInfo>> {
        const list = this.workspaces.get(projectId) ?? [];
        return Promise.resolve(list);
    }

    async getWorkspace(projectId: string, workspaceId: string): Promise<WorkspaceInfo> {
        const list = this.workspaces.get(projectId)?.filter(x => x.workspaceId === workspaceId) ?? [];
        return Promise.resolve(list?.at(0));
    }

    async saveWorkspace(projectId: string, workspace: WorkspaceInfo): Promise<WorkspaceInfo> {
        const list = this.workspaces.get(projectId)?.filter(x => x.workspaceId !== workspace.workspaceId) ?? [];
        this.workspaces.set(projectId, list.concat(workspace));
        return Promise.resolve(workspace);
    }

    async deleteWorkspace(projectId: string, workspaceId: string): Promise<void> {
        const list = this.workspaces.get(projectId)?.filter(x => x.workspaceId !== workspaceId) ?? [];
        this.workspaces.set(projectId, list);
        return Promise.resolve();
    }
}