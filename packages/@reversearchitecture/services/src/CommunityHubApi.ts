import { IWorkspaceMetadata, Workspace } from "@structurizr/dsl";
import { StructurizrLexer, StructurizrParser, StructurizrVisitor } from "@structurizr/parser";

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

    async getWorkspaceText(workspaceId: string): Promise<string> {
        const workspaceResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);

        if (!workspaceResponse.ok) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }
        
        const workspaceText = await workspaceResponse.text() as string;
        return workspaceText;
    }
    
    async getWorkspace(workspaceId: string): Promise<Workspace> {
        const workspaceResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.dsl`);

        if (!workspaceResponse.ok) {
            throw new Error(`Workspace ${workspaceId} not found`);
        }

        const workspaceText = await workspaceResponse.text() as string;
        const lexerResult = StructurizrLexer.tokenize(workspaceText);
        
        const parser = new StructurizrParser();
        parser.reset();
        parser.input = lexerResult.tokens;
        const workspaceCst = parser.workspace();

        const visitor = new StructurizrVisitor();
        const workspace = visitor.visit(workspaceCst);
        
        const metadataResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`);
        if (!metadataResponse.ok) {
            return workspace;
        }

        const metadata = await metadataResponse.json() as IWorkspaceMetadata;

        return {
            ...workspace,
            views: {
                ...workspace.views,
                systemLandscape: {
                    ...workspace.views.systemLandscape,
                    elements: metadata.views.systemLandscape?.elements ?? []
                },
                systemContexts: workspace.views.systemContexts.map((view: any) => ({
                    ...view,
                    elements: metadata.views.systemContexts.find(x => x.identifier === view.identifier)?.elements ?? []
                })),
                containers: workspace.views.containers.map((view: any) => ({
                    ...view,
                    elements: metadata.views.containers.find(x => x.identifier === view.identifier)?.elements ?? []
                })),
                components: workspace.views.components.map((view: any) => ({
                    ...view,
                    elements: metadata.views.components.find(x => x.identifier === view.identifier)?.elements ?? []
                })),
                deployments: workspace.views.deployments.map((view: any) => ({
                    ...view,
                    elements: metadata.views.deployments.find(x => x.identifier === view.identifier)?.elements ?? []
                }))
            }
        }
    }

    async getWorkspaceMetadata(workspaceId: string): Promise<IWorkspaceMetadata> {
        const metadataResponse = await fetch(`${this.baseUrl}/${workspaceId}/workspace.metadata.json`);
        if (!metadataResponse.ok) {
            throw new Error(`Workspace metadata ${workspaceId} not found`);
        }

        const metadata = await metadataResponse.json() as IWorkspaceMetadata;
        return metadata;
    }
}