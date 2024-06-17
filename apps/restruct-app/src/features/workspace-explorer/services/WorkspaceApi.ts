import { IWorkspaceMetadata, Workspace } from "@structurizr/dsl";
import { StructurizrExportClient } from "@structurizr/export-drawio";
import { IWorkspaceInfo } from "@structurizr/y-workspace";

export type WorkspaceLoadFilters = {
    query?: string;
    group?: string;
    status?: "private" | "archived" | "shared" | "bookmarked";
}

export type WorkspaceLoadOptions = {
    controller?: AbortController;
    include?: {
        code: boolean;
        content: boolean;
        metadata: boolean;
        theme: boolean;
    }
}

export class WorkspaceApi {
    private readonly structurizrExportClient = new StructurizrExportClient();
    private readonly emptyWorkspace = this.structurizrExportClient.export(Workspace.Empty.toSnapshot());
    private readonly workspaces: Array<IWorkspaceInfo> = [
        {
            workspaceId: "workspace-1",
            name: "Workspace 1",
            status: "private",
            createdBy: "jonathan.joestar",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jonathan.joestar",
            tags: [],
            group: "Group 1",
            coverUrl: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jp",
        },
        {
            workspaceId: "workspace-2",
            name: "Workspace 2",
            status: "private",
            createdBy: "caesar.zeppeli",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "caesar.zeppeli",
            tags: [],
            group: "Group 2",
            coverUrl: "https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6984989.jpg&fm=jpg",
        },
        {
            workspaceId: "workspace-3",
            name: "Workspace 3",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 2",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-4",
            name: "Workspace 4",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 3",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-5",
            name: "Workspace 5",
            status: "private",
            createdBy: "jonathan.joestar",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jonathan.joestar",
            tags: [],
            group: "Group 3",
            coverUrl: "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130498.jpg&fm=jpg",
        },
        {
            workspaceId: "workspace-6",
            name: "Workspace 6",
            status: "private",
            createdBy: "caesar.zeppeli",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "caesar.zeppeli",
            tags: [],
            group: "Group 3",
            coverUrl: "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg",
        },
        {
            workspaceId: "workspace-7",
            name: "Workspace 7",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 3",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-8",
            name: "Workspace 8",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 4",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-9",
            name: "Workspace 9",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 4",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-10",
            name: "Workspace 10",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 4",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-11",
            name: "Workspace 11",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 4",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-12",
            name: "Workspace 12",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            group: "Group 4",
            coverUrl: "",
        },
        {
            workspaceId: "workspace-13",
            name: "Workspace 11",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            coverUrl: "",
        },
        {
            workspaceId: "workspace-14",
            name: "Workspace 14",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            coverUrl: "",
        },
        {
            workspaceId: "workspace-15",
            name: "Workspace 15",
            status: "private",
            createdBy: "jotaro.kujo",
            lastModifiedDate: new Date().toUTCString(),
            lastModifiedBy: "jotaro.kujo",
            tags: [],
            coverUrl: "",
        },
    ];
    private readonly timeout = 500;

    constructor() {
    }

    async getWorkspaceById(workspaceId: string, options?: WorkspaceLoadOptions): Promise<IWorkspaceInfo> {
        // GET api/v1/workspaces/{workspaceId}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async getWorkspaceContent(workspaceId: string, options?: WorkspaceLoadOptions): Promise<string> {
        // GET api/v1/workspaces/{workspaceId}/content
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async getWorkspaceMetadata(workspaceId: string, options?: WorkspaceLoadOptions): Promise<IWorkspaceMetadata> {
        // GET api/v1/workspaces/{workspaceId}/metadata
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async getWorkspaces(filters?: WorkspaceLoadFilters, options?: WorkspaceLoadOptions): Promise<Array<IWorkspaceInfo>> {
        // GET api/v1/workspaces?query={query}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async createWorkspace(workspace: IWorkspaceInfo, options?: WorkspaceLoadOptions): Promise<IWorkspaceInfo> {
        // POST api/v1/workspaces
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async saveWorkspace(workspace: IWorkspaceInfo, options?: WorkspaceLoadOptions): Promise<IWorkspaceInfo> {
        // PUT api/v1/workspaces
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async saveWorkspaceContent(workspaceId: string, workspace: Workspace, options?: WorkspaceLoadOptions): Promise<IWorkspaceInfo> {
        // PUT api/v1/workspaces/{workspaceId}/content
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }

    async deleteWorkspace(workspaceIds: string[], options?: WorkspaceLoadOptions): Promise<void> {
        // DELETE api/v1/workspaces/{workspaceId}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }
    
    async archiveWorkspace(workspaceIds: string[], options?: WorkspaceLoadOptions): Promise<void> {
        // PUT api/v1/archive/{workspaceId}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }
    
    async restoreWorkspace(workspaceIds: string[], options?: WorkspaceLoadOptions): Promise<void> {
        // PUT api/v1/archive/{workspaceId}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }
    
    async bookmarkWorkspace(workspaceIds: string[], options?: WorkspaceLoadOptions): Promise<void> {
        // PUT api/v1/archive/{workspaceId}
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!options?.controller?.signal.aborted) {
                    reject(new Error("Method not implemented."));
                }
            }, this.timeout)
        })
    }
}