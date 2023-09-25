import { WorkspaceInfo, WorkspaceGroupInfo } from "../types";

export class WorkspaceApi {
    private groups: Array<WorkspaceGroupInfo>;
    private readonly workspaces: Map<string, Array<WorkspaceInfo>>;

    constructor(
        public readonly baseUrl: string = ""
    ) {
        const workspaceArray: Array<WorkspaceInfo> = [
            { workspaceId: "1", name: "Workspace 1", updated: new Date(), updatedBy: "1", tags: [], text: "", preview: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jp" },
            { workspaceId: "2", name: "Workspace 2", updated: new Date(), updatedBy: "1", tags: [], text: "", preview: "https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6984989.jpg&fm=jpg" },
            { workspaceId: "3", name: "Workspace 3", updated: new Date(), updatedBy: "1", tags: [], text: "", preview: "" },
            { workspaceId: "4", name: "Workspace 4", updated: new Date(), updatedBy: "1", tags: [], text: "", preview: "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130498.jpg&fm=jpg" },
            { workspaceId: "5", name: "Workspace 5", updated: new Date(), updatedBy: "1", tags: [], text: "", preview: "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg" },
        ]
        this.groups = [
            { groupId: "1", name: "Group 1", lastModifiedDate: "29.03.2023", lastModifiedBy: "pavlo@rvrs.io", workspaces: workspaceArray.slice(0, 1) },
            { groupId: "2", name: "Group 2", lastModifiedDate: "29.03.2023", lastModifiedBy: "vitalii@rvrs.io", workspaces: workspaceArray.slice(0, 2) },
            { groupId: "3", name: "Group 3", lastModifiedDate: "29.03.2023", lastModifiedBy: "oleh@rvrs.io", workspaces: workspaceArray.slice(0, 3) },
            { groupId: "4", name: "Group 4", lastModifiedDate: "29.03.2023", lastModifiedBy: "romano@rvrs.io", workspaces: workspaceArray.slice(0, 4) },
            { groupId: "5", name: "Group 5", lastModifiedDate: "29.03.2023", lastModifiedBy: "pavlo@rvrs.io", workspaces: workspaceArray },
            { groupId: "6", name: "Group 6", lastModifiedDate: "29.03.2023", lastModifiedBy: "vitalii@rvrs.io", workspaces: workspaceArray },
            { groupId: "7", name: "Group 7", lastModifiedDate: "29.03.2023", lastModifiedBy: "oleh@rvrs.io", workspaces: workspaceArray },
        ];

        this.workspaces = new Map<string, WorkspaceInfo[]>([]);
        this.workspaces.set("1", workspaceArray);
        this.workspaces.set("2", workspaceArray);
        this.workspaces.set("3", workspaceArray);
        this.workspaces.set("4", workspaceArray);
        this.workspaces.set("5", workspaceArray);
    }

    async getGroups(): Promise<Array<WorkspaceGroupInfo>> {
        return Promise.resolve<Array<WorkspaceGroupInfo>>(this.groups);
    }

    async saveGroup(group: WorkspaceGroupInfo): Promise<WorkspaceGroupInfo> {
        this.groups.push(group);
        return Promise.resolve(group);
    }

    async deleteGroup(groupId: string): Promise<void> {
        this.groups = this.groups.filter(project => project.groupId !== groupId);
        return Promise.resolve();
    }

    async getWorkspaces(groupId: string): Promise<Array<WorkspaceInfo>> {
        const list = this.workspaces.get(groupId) ?? [];
        return Promise.resolve(list);
    }

    async getWorkspacesByAuthor(authorId: string): Promise<Array<WorkspaceInfo>> {
        // TODO: get by real authorId
        const list = this.workspaces.get("1") ?? [];
        const filtered = list.filter(x => x.createdBy === authorId);
        return Promise.resolve(filtered);
    }

    async getWorkspace(groupId: string, workspaceId: string): Promise<WorkspaceInfo> {
        const list = this.workspaces.get(groupId)?.filter(x => x.workspaceId === workspaceId) ?? [];
        return Promise.resolve(list?.at(0));
    }

    async saveWorkspace(groupId: string, workspace: WorkspaceInfo): Promise<WorkspaceInfo> {
        const list = this.workspaces.get(groupId)?.filter(x => x.workspaceId !== workspace.workspaceId) ?? [];
        this.workspaces.set(groupId, list.concat(workspace));
        return Promise.resolve(workspace);
    }

    async deleteWorkspace(groupId: string, workspaceId: string): Promise<void> {
        const list = this.workspaces.get(groupId)?.filter(x => x.workspaceId !== workspaceId) ?? [];
        this.workspaces.set(groupId, list);
        return Promise.resolve();
    }
}