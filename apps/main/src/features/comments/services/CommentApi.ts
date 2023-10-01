import { CommentInfo, CommentThread } from "../types";

export class CommentApi {
    private comments: Map<string, Array<CommentThread>>;

    constructor(
        private readonly baseUrl: string = ""
    ) {
        const commentThread1: CommentThread = {
            commentThreadId: "comment-thread-1",
            comments: [
                {
                    commentId: "comment-0",
                    commentThreadId: "comment-thread-1",
                    author: "Josuke Higashikata",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-1",
                    commentThreadId: "comment-thread-1",
                    author: "Jonathan Joestar",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-2",
                    commentThreadId: "comment-thread-1",
                    author: "Will A. Zeppeli",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-3",
                    commentThreadId: "comment-thread-1",
                    author: "Robert E. O. Speedwagon",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-4",
                    commentThreadId: "comment-thread-1",
                    author: "Dio Brando",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-5",
                    commentThreadId: "comment-thread-1",
                    author: "Erina Pendleton",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-6",
                    commentThreadId: "comment-thread-1",
                    author: "George Joestar I",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
            ],
            metadata: {
                view: { type: "System Landscape", id: "System Landscape" },
                position: { x: 100, y: 100 }
            }
        }
        const commentThread2: CommentThread = {
            commentThreadId: "comment-thread-2",
            comments: [
                {
                    commentId: "comment-7",
                    commentThreadId: "comment-thread-2",
                    author: "Noriaki Kakyoin",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-12",
                    commentThreadId: "comment-thread-2",
                    author: "Jotaro Kujo",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-13",
                    commentThreadId: "comment-thread-2",
                    author: "Muhammad Avdol",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-14",
                    commentThreadId: "comment-thread-2",
                    author: "Jean Pierre Polnareff",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
            ],
            metadata: {
                view: { type: "System Landscape", id: "System Landscape" },
                position: { x: 1000, y: 1000 }
            }
        }
        const commentThread3: CommentThread = {
            commentThreadId: "comment-thread-3",
            comments: [
                {
                    commentId: "comment-10",
                    commentThreadId: "comment-thread-3",
                    author: "Joseph Joestar",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-8",
                    commentThreadId: "comment-thread-3",
                    author: "Caesar Anthonio Zeppeli",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-9",
                    commentThreadId: "comment-thread-3",
                    author: "Lisa Lisa",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
            ],
            metadata: {
                view: { type: "System Landscape", id: "System Landscape" },
                position: { x: 500, y: 300 }
            },
        }
        const commentThread4: CommentThread = {
            commentThreadId: "comment-thread-4",
            comments: [
                {
                    commentId: "comment-15",
                    commentThreadId: "comment-thread-4",
                    author: "Rudol von Stroheim",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                },
                {
                    commentId: "comment-11",
                    commentThreadId: "comment-thread-4",
                    author: "Mario Zeppeli",
                    text: "Some comment content example here, long text to test layout.",
                    createdDate: "2021-01-01",
                }
            ],
            metadata: {
                view: { type: "Container", id: "internetBankingSystem" },
                position: { x: 500, y: 300 }
            },
        }

        this.comments = new Map<string, Array<CommentThread>>();
        this.comments.set("big-bank-plc", [
            commentThread1,
            commentThread2,
            commentThread3,
            commentThread4,
        ]);
    }

    async getCommentThreadById(workspaceId: string, commentThreadId: string): Promise<CommentThread> {
        const list = this.comments.get(workspaceId)?.find(x => x.commentThreadId === commentThreadId);
        return Promise.resolve(list);
    }

    async getCommentThreads(workspaceId: string): Promise<Array<CommentThread>> {
        const list = this.comments.get(workspaceId) ?? [];
        return Promise.resolve(list);
    }

    async saveCommentThread(workspaceId: string, comment: CommentThread): Promise<CommentThread> {
        const list = this.comments.get(workspaceId) ?? [];
        this.comments.set(workspaceId, list.concat(comment));
        return Promise.resolve(comment);
    }

    async deleteCommentThread(workspaceId: string, commentId: string): Promise<void> {
        const list = this.comments.get(workspaceId)?.filter(x => x.commentThreadId !== commentId) ?? [];
        this.comments.set(workspaceId, list);
        return Promise.resolve();
    }

    async saveCommentThreadReply(workspaceId: string, commentThreadId: string, comment: CommentInfo): Promise<CommentThread> {
        const list = this.comments.get(workspaceId) ?? [];
        const commentThread = list.find(x => x.commentThreadId === commentThreadId);
        if (commentThread) {
            commentThread.comments.push(comment);
        }
        return Promise.resolve(commentThread);
    }

    async deleteCommentThreadReply(workspaceId: string, commentThreadId: string, commentId: string): Promise<void> {
        const list = this.comments.get(workspaceId) ?? [];
        const commentThread = list.find(x => x.commentThreadId === commentThreadId);
        if (commentThread) {
            commentThread.comments = commentThread.comments.filter(x => x.commentId !== commentId);
        }
        return Promise.resolve();
    }
}