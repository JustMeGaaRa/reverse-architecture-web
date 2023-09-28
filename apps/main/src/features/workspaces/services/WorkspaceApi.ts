import { WorkspaceInfo } from "../types";

export class WorkspaceApi {
    private readonly workspaces: Map<string, WorkspaceInfo>;

    constructor(
        public readonly baseUrl: string = ""
    ) {
        const workspaceArray: Array<WorkspaceInfo> = [
            {
                workspaceId: "workspace-1",
                name: "Workspace 1",
                createdDate: "20.09.23",
                createdBy: "jonathan.joestar",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jonathan.joestar",
                tags: [],
                group: "Group 1",
                text: "workspace \"Workspace 1\" { model {} views {} }",
                coverUrl: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jp"
            },
            {
                workspaceId: "workspace-2",
                name: "Workspace 2",
                createdDate: "20.09.23",
                createdBy: "caesar.zeppeli",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "caesar.zeppeli",
                tags: [],
                group: "Group 2",
                text: "",
                coverUrl: "https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6984989.jpg&fm=jpg"
            },
            {
                workspaceId: "workspace-3",
                name: "Workspace 3",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 2",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-4",
                name: "Workspace 4",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 3",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-5",
                name: "Workspace 5",
                createdDate: "20.09.23",
                createdBy: "jonathan.joestar",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jonathan.joestar",
                tags: [],
                group: "Group 3",
                text: "",
                coverUrl: "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130498.jpg&fm=jpg"
            },
            {
                workspaceId: "workspace-6",
                name: "Workspace 6",
                createdDate: "20.09.23",
                createdBy: "caesar.zeppeli",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "caesar.zeppeli",
                tags: [],
                group: "Group 3",
                text: "",
                coverUrl: "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg"
            },
            {
                workspaceId: "workspace-7",
                name: "Workspace 7",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 4",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-8",
                name: "Workspace 8",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 4",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-9",
                name: "Workspace 9",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 4",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-10",
                name: "Workspace 10",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 4",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-11",
                name: "Workspace 11",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 5",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-12",
                name: "Workspace 12",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 5",
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-13",
                name: "Workspace 11",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-14",
                name: "Workspace 14",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                text: "",
                coverUrl: ""
            },
            {
                workspaceId: "workspace-15",
                name: "Workspace 15",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                text: "workspace \"Workspace 1\" { model {} views {} }",
                coverUrl: ""
            },
        ];

        this.workspaces = new Map<string, WorkspaceInfo>(
            workspaceArray.map(x => [x.workspaceId, x])
        );
    }

    async getWorkspaceById(workspaceId: string): Promise<WorkspaceInfo> {
        const workspace = this.workspaces.get(workspaceId);
        return Promise.resolve(workspace);
    }

    async getWorkspaces(): Promise<Array<WorkspaceInfo>> {
        const list = Array.from(this.workspaces.values());
        return Promise.resolve(list);
    }

    async saveWorkspace(workspaceId: string, workspace: WorkspaceInfo): Promise<Array<WorkspaceInfo>> {
        this.workspaces.set(workspaceId, workspace);
        const list = Array.from(this.workspaces.values());
        return Promise.resolve(list);
    }

    async deleteWorkspace(workspaceIds: string[]): Promise<Array<WorkspaceInfo>> {
        workspaceIds.forEach(workspaceId => this.workspaces.delete(workspaceId));
        const list = Array.from(this.workspaces.values());
        return Promise.resolve(list);
    }
}