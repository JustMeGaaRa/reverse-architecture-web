import { IWorkspaceMetadata, IWorkspaceTheme } from "@structurizr/dsl";

export type WorkspaceInfo = {
    workspaceId: string;
    name: string;
    updated: Date;
    updatedBy: string;
    tags: Array<string>;
    
    text: string;
    metadata?: IWorkspaceMetadata;
    theme?: IWorkspaceTheme;
}