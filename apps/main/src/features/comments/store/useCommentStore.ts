import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CommentInfo, CommentThread } from "../types";

export const useCommentStore = create(persist<{
    commentThreads: Array<CommentThread>;
    getCommentThreads: (workspaceId: string) => Array<CommentThread>;
    startCommentThread: (workspaceId: string, thread: CommentThread) => void;
    resolveCommentThread: (treadId: string) => void;
    replyCommentThread: (treadId: string, comment: CommentInfo) => void;
}>(
    (set, get) => ({
        commentThreads: [] as Array<CommentThread>,
        getCommentThreads: (workspaceId: string) => {
            return get().commentThreads
                .filter(x => x.workspaceId === workspaceId)
                .sort((left, right) => left.comments.at(0).createdDate.localeCompare(right.comments.at(0).createdDate));
        },
        startCommentThread: (workspaceId: string, thread: CommentThread) => set(state => ({
            ...state,
            commentThreads: [
                ...state.commentThreads.filter(x => x.commentThreadId !== thread.commentThreadId),
                thread
            ]
        })),
        resolveCommentThread: (treadId: string) => set(state => ({
            ...state,
            commentThreads: state.commentThreads.filter(x => x.commentThreadId !== treadId)
        })),
        replyCommentThread: (treadId: string, comment: CommentInfo) => set(state => ({
            ...state,
            commentThreads: state.commentThreads.map(commentThread => {
                if (commentThread.commentThreadId === treadId) {
                    return {
                        ...commentThread,
                        comments: [
                            ...commentThread.comments.filter(x => x.commentId !== comment.commentId),
                            comment
                        ]
                    }
                }
                return commentThread;
            })
        })),
    }),
    {
        name: "comments-storage",
        storage: createJSONStorage(() => sessionStorage),
    }
))