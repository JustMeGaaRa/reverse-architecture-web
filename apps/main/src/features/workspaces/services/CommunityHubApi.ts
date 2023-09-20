import {
    IWorkspaceMetadata,
    IWorkspaceTheme
} from "@structurizr/dsl";
import { WorkspaceInfo } from "../types";

export class CommunityHubApi {
    constructor(
        private readonly baseUrl: string = "https://raw.githubusercontent.com/JustMeGaaRa/reverse-architecture-community/main/workspaces"
    ) { }

    async getWorkspaces(): Promise<Array<WorkspaceInfo>> {
        const response = await fetch(`${this.baseUrl}/list.json`);
        const { values } = await response.json();
        return values;
    }

    async getWorkspace(workspaceId: string): Promise<WorkspaceInfo> {
        // TODO: cache this call temporary until we have a proper API
        const workspaceListResponse = await fetch(`${this.baseUrl}/list.json`);
        const { values } = workspaceListResponse.ok ? await workspaceListResponse.json() : { values: [] };
        const workspaceInfo = values.find(workspace => workspace.id === workspaceId);

        const workspaceDslResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);
        const text = workspaceDslResponse.ok ? await workspaceDslResponse.text() as string : "";

        const metadataResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`);
        const metadata = metadataResponse.ok ? await metadataResponse.json() as IWorkspaceMetadata : undefined;

        const themeResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.theme.json`);
        const theme = themeResponse.ok ? await themeResponse.json() as IWorkspaceTheme : undefined;

        return {
            ...workspaceInfo,
            text,
            metadata,
            theme,
        };
    }

    async publishWorkspace(workspace: WorkspaceInfo): Promise<WorkspaceInfo> {
        // TODO: publish the workspace to the community hub
        return Promise.resolve(workspace);
    }
}