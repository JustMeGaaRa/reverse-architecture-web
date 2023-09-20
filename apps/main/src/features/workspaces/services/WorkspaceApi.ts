import { WorkspaceInfo } from "../types";

export class WorkspaceApi {
    private readonly workspaces: Map<string, Array<WorkspaceInfo>>;

    constructor(
        public readonly baseUrl: string = ""
    ) {
        const workspaceArray: Array<WorkspaceInfo> = [
            { workspaceId: "1", name: "Workspace 1", updated: new Date(), updatedBy: "1", tags: [], text: "" },
            { workspaceId: "2", name: "Workspace 2", updated: new Date(), updatedBy: "1", tags: [], text: "" },
            { workspaceId: "3", name: "Workspace 3", updated: new Date(), updatedBy: "1", tags: [], text: "" },
            { workspaceId: "4", name: "Workspace 4", updated: new Date(), updatedBy: "1", tags: [], text: "" },
            { workspaceId: "5", name: "Workspace 5", updated: new Date(), updatedBy: "1", tags: [], text: "" },
        ]

        this.workspaces = new Map<string, WorkspaceInfo[]>([]);
        this.workspaces.set("1", workspaceArray);
        this.workspaces.set("2", workspaceArray);
        this.workspaces.set("3", workspaceArray);
        this.workspaces.set("4", workspaceArray);
        this.workspaces.set("5", workspaceArray);
    }

    async getWorkspaces(projectId: string): Promise<Array<WorkspaceInfo>> {
        const list = this.workspaces.get(projectId) ?? [];
        return Promise.resolve(list);
    }

    async getWorkspacesByAuthor(authorId: string): Promise<Array<WorkspaceInfo>> {
        const list = this.workspaces.get(authorId) ?? [];
        const filtered = list.filter(x => x.createdBy === authorId);
        return Promise.resolve(filtered);
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