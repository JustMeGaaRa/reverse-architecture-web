import { IWorkspaceMetadata, IWorkspaceTheme } from "structurizr";

export type WorkspaceInfo = {
    workspaceId: string;
    name: string;
    description?: string;
    createdBy: string;
    createdDate: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    coverUrl?: string;
    group?: string;
    tags: Array<string>;
    content?: {
        text: string;
        metadata?: IWorkspaceMetadata;
        theme?: IWorkspaceTheme;
    }
}