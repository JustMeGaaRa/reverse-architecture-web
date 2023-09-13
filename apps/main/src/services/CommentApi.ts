import { CommentInfo } from "../model";

export class CommentApi {
    private comments: Map<string, Array<CommentInfo>>;

    constructor(
        private readonly baseUrl: string = ""
    ) {
        const commentsArray = [
            {
                commentId: "comment-1",
                author: "Vitalik Skovron",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "System Context", id: "email" },
            },
            {
                commentId: "comment-2",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Container", id: "api" },
            },
            {
                commentId: "comment-3",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Container", id: "" },
            },
            {
                commentId: "comment-4",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "System Landscape", id: "" },
            },
            {
                commentId: "comment-5",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Component", id: "" },
            },
            {
                commentId: "comment-6",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Deployment", id: "" },
            },
            {
                commentId: "comment-7",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Deployment", id: "" },
            },
            {
                commentId: "comment-8",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Container", id: "" },
            },
            {
                commentId: "comment-9",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Deployment", id: "" },
            },
            {
                commentId: "comment-10",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Component", id: "" },
            },
            {
                commentId: "comment-11",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "Component", id: "" },
            },
            {
                commentId: "comment-12",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "System Context", id: "" },
            },
            {
                commentId: "comment-13",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "System Context", id: "" },
            },
            {
                commentId: "comment-14",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "System Context", id: "" },
            },
            {
                commentId: "comment-15",
                author: "Pavlo Hodysh",
                text: "Some comment content example here, long text to test layout.",
                createdAt: "2021-01-01",
                metadata: { type: "System Context", id: "" },
            },
        ];

        this.comments = new Map<string, Array<CommentInfo>>();
        this.comments.set("big-bank-plc", commentsArray);
    }

    async getComments(workspaceId: string): Promise<Array<CommentInfo>> {
        const list = this.comments.get(workspaceId) ?? [];
        return Promise.resolve(list);
    }

    async saveComment(workspaceId: string, comment: CommentInfo): Promise<CommentInfo> {
        const list = this.comments.get(workspaceId) ?? [];
        this.comments.set(workspaceId, list.concat(comment));
        return Promise.resolve(comment);
    }

    async deleteComment(workspaceId: string, commentId: string): Promise<void> {
        const list = this.comments.get(workspaceId)?.filter(x => x.commentId !== commentId) ?? [];
        this.comments.set(workspaceId, list);
        return Promise.resolve();
    }
}