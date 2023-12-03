import { Workspace } from "@structurizr/dsl";
import { StructurizrExportClient } from "@structurizr/export";
import { WorkspaceApi } from "../services";
import { useWorkspaceStore } from "../store";
import { WorkspaceInfo } from "../types";

export class WorkspaceCacheWrapper {
    constructor(
        private readonly api: WorkspaceApi,
        private readonly workspaces: Array<WorkspaceInfo> = []
    ) {
        const structurizrExportClient = new StructurizrExportClient();
        const emptyWorkspace = structurizrExportClient.export(Workspace.Empty.toObject());
        this.workspaces = [
            {
                workspaceId: "workspace-1",
                name: "Workspace 1",
                createdDate: "20.09.23",
                createdBy: "jonathan.joestar",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jonathan.joestar",
                tags: [],
                group: "Group 1",
                coverUrl: "https://images.pexels.com/photos/7135121/pexels-photo-7135121.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7135121.jpg&fm=jp",
                content: {
                    text: emptyWorkspace
                }
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
                coverUrl: "https://images.pexels.com/photos/6984989/pexels-photo-6984989.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6984989.jpg&fm=jpg",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-7130498.jpg&fm=jpg",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "https://images.pexels.com/photos/6985128/pexels-photo-6985128.jpeg?cs=srgb&dl=pexels-codioful-%28formerly-gradienta%29-6985128.jpg&fm=jpg",
                content: {
                    text: emptyWorkspace
                },
            },
            {
                workspaceId: "workspace-7",
                name: "Workspace 7",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 3",
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
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
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
            },
            {
                workspaceId: "workspace-11",
                name: "Workspace 11",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 4",
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
            },
            {
                workspaceId: "workspace-12",
                name: "Workspace 12",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                group: "Group 4",
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
            },
            {
                workspaceId: "workspace-13",
                name: "Workspace 11",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
            },
            {
                workspaceId: "workspace-14",
                name: "Workspace 14",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
            },
            {
                workspaceId: "workspace-15",
                name: "Workspace 15",
                createdDate: "20.09.23",
                createdBy: "jotaro.kujo",
                lastModifiedDate: new Date().toLocaleDateString(),
                lastModifiedBy: "jotaro.kujo",
                tags: [],
                coverUrl: "",
                content: {
                    text: emptyWorkspace
                },
            },
        ];
    }

    async getWorkspaceById(workspaceId: string): Promise<WorkspaceInfo> {
        await this.api.getWorkspaceById(workspaceId)
            .then(result => {
                useWorkspaceStore.getState().setWorkspace(result);
            })
            .catch(error => {
                console.error(error);
            });
        const workspace = useWorkspaceStore.getState().getWorkspace(workspaceId);
        return Promise.resolve(workspace);
    }

    async getWorkspaces(): Promise<Array<WorkspaceInfo>> {
        await this.api.getWorkspaces()
            .then(result => {
                result.forEach(workspace => useWorkspaceStore.getState().setWorkspace(workspace))
            })
            .catch(error => {
                console.error(error);
            });
        const workspaces = useWorkspaceStore.getState().workspaces;
        return Promise.resolve(workspaces);
    }

    async saveWorkspace(workspaceId: string, workspace: WorkspaceInfo): Promise<Array<WorkspaceInfo>> {
        useWorkspaceStore.getState().setWorkspace(workspace);
        const workspaces = useWorkspaceStore.getState().workspaces;
        return Promise.resolve(workspaces);
    }

    async deleteWorkspace(workspaceIds: string[]): Promise<Array<WorkspaceInfo>> {
        workspaceIds.forEach(workspaceId => useWorkspaceStore.getState().deleteWorkspace(workspaceId));
        const workspaces = useWorkspaceStore.getState().workspaces;
        return Promise.resolve(workspaces);
    }
}