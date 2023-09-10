import { IComment } from "../containers";

export class CommentApi {
    private comments: Array<IComment>;

    constructor(
        private readonly baseUrl: string = ""
    ) { }

    async getComments(workspaceId: string): Promise<Array<IComment>> {
        const commentArray = [
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

        this.comments = commentArray;
        return Promise.resolve(commentArray);
    }

    async addComment(comment: IComment): Promise<IComment> {
        this.comments.push(comment);
        return Promise.resolve(comment);
    }

    async removeComment(commentId: string): Promise<IComment> {
        const comment = this.comments.find((comment) => comment.commentId === commentId);
        this.comments = this.comments.filter((comment) => comment.commentId !== commentId);
        return Promise.resolve(comment);
    }
}