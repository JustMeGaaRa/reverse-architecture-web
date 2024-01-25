import { IWorkspaceMetadata, IWorkspaceTheme } from "structurizr";
import { WorkspaceInfo } from "../../workspaces";

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

export class CommunityApi {
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

    getFilterTags(): Promise<string[]> {
        return this.fetchWorkspaceList()
            .then(workspaces => {
                return Array.from(new Set(workspaces.flatMap(workspace => workspace.tags)))
            });
    }

    async getWorkspaceById(workspaceId: string): Promise<WorkspaceInfo> {
        const list = await this.fetchWorkspaceList();
        const workspaceInfo = list.find(w => w.workspaceId === workspaceId);
        return workspaceInfo;
    }

    async getWorkspaces(query?: string, tags?: string[]): Promise<WorkspaceInfo[]> {
        // TODO: consider moving this to the backend
        const chunks = (query ? query.split(" ") : [])
            .map(chunk => chunk.trim())
            .filter(chunk => chunk.length > 0);
        
        const workspaces = await this.fetchWorkspaceList();
        return chunks.length === 0
            ? workspaces
            : workspaces.filter(workspace => {
                return chunks.some(chunk => workspace.name.toLowerCase().includes(chunk.toLowerCase()))
            })
    }

    async getWorkspaceContent(workspaceId: string): Promise<string> {
        const workspaceResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);
        const text = workspaceResponse.ok ? await workspaceResponse.text() as string : "";
        return text;
    }

    async getWorkspaceMetadata(workspaceId: string): Promise<IWorkspaceMetadata> {
        const metadataResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`);
        const metadata = metadataResponse.ok ? await metadataResponse.json() as IWorkspaceMetadata : undefined;
        return metadata;
    }

    async getWorkspaceTheme(workspaceId: string): Promise<IWorkspaceTheme> {
        const themeResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.theme.json`);
        const theme = themeResponse.ok ? await themeResponse.json() as IWorkspaceTheme : undefined;
        return theme;
    }

    async publishWorkspace(workspace: WorkspaceInfo): Promise<void> {
        // TODO: implement by creating a request on GitHub
        return undefined;
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
}