import { IWorkspaceMetadata, IWorkspaceTheme } from "structurizr";
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
    }

    async getWorkspaceById(workspaceId: string): Promise<WorkspaceInfo> {
        return this.fetchWorkspace(workspaceId);
    }

    async getWorkspaces(): Promise<Array<WorkspaceInfo>> {
        return this.fetchWorkspaceList();
    }

    async saveWorkspace(workspaceId: string, workspace: WorkspaceInfo): Promise<Array<WorkspaceInfo>> {
        // TODO: save workspace when there is an API
        throw new Error("Method not implemented.");
    }

    async deleteWorkspace(workspaceIds: string[]): Promise<Array<WorkspaceInfo>> {
        // TODO: delete workspace when there is an API
        throw new Error("Method not implemented.");
    }

    async fetchWorkspaceList(): Promise<Array<WorkspaceInfo>> {
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
            }));
        
        return workspaces;
    }

    async fetchWorkspace(workspaceId: string): Promise<WorkspaceInfo> {
        const list = await this.fetchWorkspaceList();
        const workspaceInfo = list.find(w => w.workspaceId === workspaceId);

        const workspaceResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);

        if (!workspaceResponse.ok) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }
        
        const text = workspaceResponse.ok ? await workspaceResponse.text() as string : "";

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