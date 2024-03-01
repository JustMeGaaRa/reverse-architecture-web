import { IWorkspaceMetadata } from "structurizr";

export type WorkspaceStatus = "private" | "shared" | "archived";

export type WorkspaceInfo = {
    workspaceId: string;
    name: string;
    description?: string;
    coverUrl?: string;
    status?: WorkspaceStatus;
    group?: string;
    createdBy: string;
    createdDate: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    tags: Array<string>;
    metadata?: WorkspaceInfoMetadata;
    statistics?: WorkspaceInfoStats,
    content?: {
        structurizr?: string;
        metadata?: IWorkspaceMetadata
    }
}

export type WorkspaceInfoMetadata = {
    isBookmarked: boolean;
    isLiked: boolean;
}

export type WorkspaceInfoStats = {
    used: number;
    bookmarked: number;
    liked: number;
}