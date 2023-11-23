import { IWorkspaceMetadata, IWorkspaceTheme, Workspace } from "@structurizr/dsl";
import { StructurizrExportClient } from "@structurizr/export";
import { useWorkspaceStore } from "../store";
import { WorkspaceInfo } from "../types";

type CommunityTemplate = {
    workspaceId: string;
    name: string;
    updated: string;
    author?: string;
    preview?: string;
    tags: Array<string>;
}

type WorkspaceApiOptions = {
    owner: string;
    repository: string;
}

export class WorkspaceApi {
    private readonly githubUrl: string = "https://raw.githubusercontent.com/";
    private readonly baseUrl: string = "";
    private readonly workspaces: Array<WorkspaceInfo>;

    constructor(
        public readonly options: WorkspaceApiOptions = {
            owner: "JustMeGaaRa",
            repository: "reverse-architecture-community",
        }
    ) {
        this.baseUrl = `${this.githubUrl}/${this.options.owner}/${this.options.repository}/main/workspaces`;

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
        // const workspace = this.workspaces.get(workspaceId);
        const workspace = await this.fetchWorkspace(workspaceId)
            .then(result => result)
            .catch(error => useWorkspaceStore.getState().getWorkspace(workspaceId));
        return Promise.resolve(workspace);
    }

    async getWorkspaces(): Promise<Array<WorkspaceInfo>> {
        // const list = Array.from(this.workspaces.values());
        const list = await this.featchWorkspaceList()
            .then(result => result)
            .catch(error => useWorkspaceStore.getState().workspaces);
        return Promise.resolve(list);
    }

    async saveWorkspace(workspaceId: string, workspace: WorkspaceInfo): Promise<Array<WorkspaceInfo>> {
        // TODO: save workspace when there is an API
        // this.workspaces.set(workspaceId, workspace);
        // const list = Array.from(this.workspaces.values());
        useWorkspaceStore.getState().setWorkspace(workspace);
        const list = useWorkspaceStore.getState().workspaces;
        return Promise.resolve(list);
    }

    async deleteWorkspace(workspaceIds: string[]): Promise<Array<WorkspaceInfo>> {
        // TODO: delete workspace when there is an API
        // workspaceIds.forEach(workspaceId => this.workspaces.delete(workspaceId));
        // const list = Array.from(this.workspaces.values());
        workspaceIds.forEach(workspaceId => useWorkspaceStore.getState().deleteWorkspace(workspaceId));
        const list = useWorkspaceStore.getState().workspaces;
        return Promise.resolve(list);
    }

    async featchWorkspaceList(): Promise<Array<WorkspaceInfo>> {
        const workspaceListResponse = await fetch(`${this.baseUrl}/list.json`);
        const { values } = workspaceListResponse.ok ? await workspaceListResponse.json() : { values: [] };
        const workspaces = (values as CommunityTemplate[])
            .map<WorkspaceInfo>(info => ({
                workspaceId: info.workspaceId,
                name: info.name,
                createdBy: info.author,
                createdDate: info.updated,
                lastModifiedBy: info.author,
                lastModifiedDate: info.updated,
                coverUrl: info.preview,
                tags: info.tags,
            }))
            .map(workspace => {
                useWorkspaceStore.getState().setWorkspace(workspace)
                return workspace;
            });
        
        return workspaces;
    }

    async fetchWorkspace(workspaceId: string): Promise<WorkspaceInfo> {
        const workspaceInfo = useWorkspaceStore.getState().getWorkspace(workspaceId);

        const workspaceDslResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);
        const text = workspaceDslResponse.ok ? await workspaceDslResponse.text() as string : "";

        const metadataResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`);
        const metadata = metadataResponse.ok ? await metadataResponse.json() as IWorkspaceMetadata : undefined;

        const themeResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.theme.json`);
        const theme = themeResponse.ok ? await themeResponse.json() as IWorkspaceTheme : undefined;

        return {
            ...workspaceInfo,
            content: {
                text,
                metadata,
                theme,
            }
        };
    }
}