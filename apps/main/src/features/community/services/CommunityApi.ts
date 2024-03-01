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

type CommunityLoadFilters = {
    query?: string;
    category?: string;
    tags?: Array<string>;
}

type CommunityLoadOptions = {
    controller?: AbortController;
}

type WorkspaceApiOptions = {
    owner: string;
    repository: string;
}

const withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    const delay = new Promise(resolve => setTimeout(resolve, timeout));
    return Promise.all([promise, delay]).then(([result]) => result);
}

export class CommunityApi {
    private readonly githubUrl: string = "https://raw.githubusercontent.com/";
    private readonly baseUrl: string = "";
    private readonly timeout: number = 500;

    constructor(
        public readonly options: WorkspaceApiOptions = {
            owner: "JustMeGaaRa",
            repository: "reverse-architecture-community",
        }
    ) {
        this.baseUrl = `${this.githubUrl}/${this.options.owner}/${this.options.repository}/main/workspaces`;
    }

    async getFilterTags(): Promise<string[]> {
        const workspaces = await withTimeout(this.fetchWorkspaceList(), this.timeout);
        return Array.from(new Set(workspaces.flatMap(workspace => workspace.tags)));
    }

    async getWorkspaceById(workspaceId: string, options?: CommunityLoadOptions): Promise<WorkspaceInfo> {
        const list = await withTimeout(this.fetchWorkspaceList(), this.timeout);
        const structurizr = await this.getWorkspaceContent(workspaceId, options);
        const metadata = await this.getWorkspaceMetadata(workspaceId, options);
        const workspaceInfo = list.find(w => w.workspaceId === workspaceId);
        return { ...workspaceInfo, content: { structurizr, metadata }};
    }

    async getWorkspaces(filters: CommunityLoadFilters, options?: CommunityLoadOptions): Promise<WorkspaceInfo[]> {
        // TODO: consider moving this to the backend
        const chunks = (filters.query ? filters.query.split(" ") : [])
            .map(chunk => chunk.trim())
            .filter(chunk => chunk.length > 0);
        
        let filtered = await withTimeout(this.fetchWorkspaceList(), this.timeout);

        if (filters?.category !== undefined && filters?.category === "Explore") {
            filtered = filtered.filter(x => {
                return filters.tags?.every(tag => x.tags?.includes(tag))
                    || filters.tags === undefined
                    || filters.tags?.length === 0;
            });
        }
        if (filters?.category !== undefined && filters?.category !== "Explore") {
            filtered = filtered.filter(x => {
                return x.tags?.includes(filters?.category)
                    && (filters.tags?.every(tag => x.tags?.includes(tag))
                    || filters.tags === undefined
                    || filters.tags?.length === 0);
            });
        }

        if (chunks.length > 0) {
            filtered = filtered.filter(workspace => {
                return chunks.some(chunk => workspace.name.toLowerCase().includes(chunk.toLowerCase()))
            })
        }

        return filtered;
    }

    async getWorkspaceContent(workspaceId: string, options?: CommunityLoadOptions): Promise<string> {
        const workspaceResponse = await withTimeout(fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`), this.timeout);
        const text = workspaceResponse.ok ? await workspaceResponse.text() as string : "";
        return text;
    }

    async getWorkspaceMetadata(workspaceId: string, options?: CommunityLoadOptions): Promise<IWorkspaceMetadata> {
        const metadataResponse = await withTimeout(fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`), this.timeout);
        const metadata = metadataResponse.ok ? await metadataResponse.json() as IWorkspaceMetadata : undefined;
        return metadata;
    }

    async getWorkspaceTheme(workspaceId: string, options?: CommunityLoadOptions): Promise<IWorkspaceTheme> {
        const themeResponse = await withTimeout(fetch(`${this.baseUrl}/${workspaceId}/workspace.theme.json`), this.timeout);
        const theme = themeResponse.ok ? await themeResponse.json() as IWorkspaceTheme : undefined;
        return theme;
    }

    async publishWorkspace(workspace: WorkspaceInfo, options?: CommunityLoadOptions): Promise<void> {
        // TODO: implement by creating a request on GitHub
        return undefined;
    }

    async fetchWorkspaceList(options?: CommunityLoadOptions): Promise<Array<WorkspaceInfo>> {
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