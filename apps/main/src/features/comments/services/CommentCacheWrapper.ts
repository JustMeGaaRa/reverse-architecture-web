import { CommentInfo, CommentThread, CommentThreadMetadata } from "../types";
import { CommentApi } from "./CommentApi";

export class CommentCacheWrapper {
    constructor(
        private readonly api: CommentApi
    ) {

    }

    async getBiscussionById(workspaceId: string, commentThreadId: string): Promise<CommentThread> {
        return this.api.getBiscussionById(workspaceId, commentThreadId);
    }
    
    async getDiscussions(workspaceId: string): Promise<Array<CommentThread>> {
        return this.api.getDiscussions(workspaceId);
    }
    
    async saveDiscussions(workspaceId: string, comment: CommentInfo, metadata: CommentThreadMetadata): Promise<CommentThread> {
        return this.api.saveDiscussions(workspaceId, comment, metadata);
    }
    
    async deleteDiscussions(workspaceId: string, commentId: string): Promise<CommentThread> {
        return this.api.deleteDiscussions(workspaceId, commentId);
    }
    
    async saveDiscussionReply(workspaceId: string, commentThreadId: string, comment: CommentInfo): Promise<CommentThread> {
        return this.api.saveDiscussionReply(workspaceId, commentThreadId, comment);
    }
}