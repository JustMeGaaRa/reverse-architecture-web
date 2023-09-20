import { IWorkspaceMetadata, IWorkspaceTheme } from "@structurizr/dsl";

export type WorkspaceInfo = {
    workspaceId: string;
    name: string;
    description?: string;
    createdBy?: string;
    // TODO: rename to createdDate
    updated: Date;
    // TODO: rename to lastModifiedBy
    updatedBy: string;
    tags: Array<string>;
    
    text: string;
    metadata?: IWorkspaceMetadata;
    theme?: IWorkspaceTheme;
    
    // TODO: remove this after refactoring
    author?: string;
    preview?: string;
}