import { Workspace } from "structurizr";

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
    code?: string;
    content?: Workspace;
    metadata?: WorkspaceInfoMetadata;
    statistics?: WorkspaceStats,
}

export type WorkspaceInfoMetadata = {
    isBookmarked: boolean;
    isLiked: boolean;
}

export type WorkspaceStats = {
    used: number;
    bookmarked: number;
    liked: number;
}