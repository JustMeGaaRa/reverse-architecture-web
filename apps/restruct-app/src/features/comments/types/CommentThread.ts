import { CommentInfo, CommentThreadMetadata } from "../types";

export type CommentThread = {
    workspaceId: string;
    commentThreadId: string;
    comments: Array<CommentInfo>;
    isResolved?: boolean;
    metadata?: CommentThreadMetadata;
}