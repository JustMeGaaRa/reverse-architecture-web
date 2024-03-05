import { ViewType } from "@structurizr/react";
import { useCommentStore } from "../store";
import { CommentInfo, CommentThread, CommentThreadMetadata } from "../types";

const withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
    const delay = new Promise(resolve => setTimeout(resolve, timeout));
    return Promise.all([promise, delay]).then(([result]) => result);
}

export class CommentApi {
    private readonly comments: Array<CommentThread> = [];
    private readonly timeout = 500;

    constructor(
        private readonly baseUrl: string = ""
    ) {
        const commentThread1: CommentThread = {
            workspaceId: "big-bank-plc",
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
                view: { type: ViewType.SystemLandscape, identifier: "System Landscape" },
                position: { x: 100, y: 100 }
            }
        }
        const commentThread2: CommentThread = {
            workspaceId: "big-bank-plc",
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
                view: { type: ViewType.SystemLandscape, identifier: "System Landscape" },
                position: { x: 1000, y: 1000 }
            }
        }
        const commentThread3: CommentThread = {
            workspaceId: "big-bank-plc",
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
                view: { type: ViewType.SystemLandscape, identifier: "System Landscape" },
                position: { x: 500, y: 300 }
            },
        }
        const commentThread4: CommentThread = {
            workspaceId: "big-bank-plc",
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
                view: { type: ViewType.Container, identifier: "internetBankingSystem" },
                position: { x: 500, y: 300 }
            },
        }
        this.comments = [commentThread1, commentThread2, commentThread3, commentThread4];
    }

    async getBiscussionById(workspaceId: string, commentThreadId: string): Promise<CommentThread> {
        const discussion = Promise.resolve(useCommentStore.getState().discussions.find(x => x.workspaceId === workspaceId && x.commentThreadId === commentThreadId));
        return withTimeout(discussion, this.timeout);
    }

    async getDiscussions(workspaceId: string): Promise<Array<CommentThread>> {
        const discussions = Promise.resolve(useCommentStore.getState().discussions.filter(x => x.workspaceId === workspaceId) ?? []);
        return withTimeout(discussions, this.timeout);
    }

    async saveDiscussions(workspaceId: string, comment: CommentInfo, metadata: CommentThreadMetadata): Promise<CommentThread> {
        const discussion = Promise.resolve(useCommentStore.getState().startDiscussion(workspaceId, comment, metadata));
        return withTimeout(discussion, this.timeout);
    }

    async deleteDiscussions(workspaceId: string, commentId: string): Promise<CommentThread> {
        const discussion = Promise.resolve(useCommentStore.getState().resolveDiscussion(workspaceId, commentId));
        return withTimeout(discussion, this.timeout);
    }

    async saveDiscussionReply(workspaceId: string, commentThreadId: string, comment: CommentInfo): Promise<CommentThread> {
        const discussion = Promise.resolve(useCommentStore.getState().replyInDiscussion(workspaceId, commentThreadId, comment));
        return withTimeout(discussion, this.timeout);
    }
}