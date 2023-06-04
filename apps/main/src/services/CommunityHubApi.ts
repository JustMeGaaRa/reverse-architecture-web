import {
    IWorkspaceMetadata,
    IWorkspaceTheme,
    fetchTheme,
    Workspace
} from "@structurizr/dsl";

interface IWorkspaceInfo {
    workspaceId: string;
    name: string;
    updated: Date;
    updatedBy: string;
    tags: Array<string>;
}

export class CommunityHubApi {
    constructor(
        private readonly baseUrl: string = "https://raw.githubusercontent.com/JustMeGaaRa/reverse-architecture-community/main/workspaces"
    ) { }

    async getWorkspaces(): Promise<Array<IWorkspaceInfo>> {
        const response = await fetch(`${this.baseUrl}/list.json`);
        const { values } = await response.json();
        return values;
    }

    async getWorkspace(workspaceId: string): Promise<Workspace> {
        const workspaceResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.json`);

        if (!workspaceResponse.ok) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }
        
        const workspace = await workspaceResponse.json() as Workspace;
        return workspace;
    }

    async getWorkspaceText(workspaceId: string): Promise<string | undefined> {
        const workspaceResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);

        if (!workspaceResponse.ok) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }
        
        const workspaceText = await workspaceResponse.text() as string;
        return workspaceText;
    }

    async getWorkspaceMetadata(workspaceId: string): Promise<IWorkspaceMetadata | undefined> {
        const metadataResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`);
        if (metadataResponse.ok) {
            const metadata = await metadataResponse.json() as IWorkspaceMetadata;
            return metadata;
        }
        return undefined;
    }

    async getWorkspaceTheme(workspaceId: string): Promise<IWorkspaceTheme | undefined> {
        const themeResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.theme.json`);
        if (themeResponse.ok) {
            const theme = await themeResponse.json() as IWorkspaceTheme;
            return theme;
        }
        return undefined;
    }
}