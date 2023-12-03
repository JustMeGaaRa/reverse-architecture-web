import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 } from "uuid";
import { CommentInfo, CommentThread, CommentThreadMetadata } from "../types";

export const useCommentStore = create(persist<{
    discussions: Array<CommentThread>;
    getDiscussions: (workspaceId: string) => Array<CommentThread>;
    startDiscussion: (workspaceId: string, comment: CommentInfo, metadata: CommentThreadMetadata) => CommentThread;
    resolveDiscussion: (workspaceId: string, discussionId: string) => CommentThread;
    replyInDiscussion: (workspaceId: string, discussionId: string, comment: CommentInfo) => CommentThread;
}>(
    (set, get) => ({
        discussions: [] as Array<CommentThread>,
        getDiscussions: (workspaceId: string) => {
            return get().discussions
                .filter(x => x.workspaceId === workspaceId)
                .sort((left, right) => left.comments.at(0).createdDate.localeCompare(right.comments.at(0).createdDate));
        },
        startDiscussion: (workspaceId: string, comment: CommentInfo, metadata: CommentThreadMetadata) => {
            const discussion: CommentThread = {
                commentThreadId: v4(),
                workspaceId: workspaceId,
                comments: [comment],
                metadata: metadata
            }
            set(state => ({
                ...state,
                discussions: [
                    ...state.discussions.filter(discussion => {
                        return discussion.workspaceId !== workspaceId
                            && discussion.commentThreadId !== discussion.commentThreadId
                    }),
                    discussion
                ]
            }))
            return discussion;
        },
        resolveDiscussion: (workspaceId: string, discussionId: string) => {
            const existingDiscussion = get().discussions.find(x => x.workspaceId === workspaceId && x.commentThreadId === discussionId);
            const updatedDicussion = {
                commentThreadId: discussionId,
                workspaceId: workspaceId,
                comments: existingDiscussion?.comments ?? [],
                isResolved: true,
            };
            set(state => ({
                ...state,
                discussions: [
                    ...state.discussions.filter(discussion => {
                        return discussion.workspaceId !== workspaceId
                            && discussion.commentThreadId !== discussionId
                    }),
                    updatedDicussion
                ]
            }))
            return updatedDicussion;
        },
        replyInDiscussion: (workspaceId: string, discussionId: string, comment: CommentInfo) => {
            const existingDiscussion = get().discussions.find(x => x.workspaceId === workspaceId && x.commentThreadId === discussionId);
            const updatedDicussion = {
                commentThreadId: discussionId,
                workspaceId: workspaceId,
                comments: [ ...existingDiscussion?.comments ?? [], comment],
                metadata: existingDiscussion?.metadata
            };
            console.log(updatedDicussion)
            set(state => ({
                ...state,
                discussions: [
                    ...state.discussions.filter(discussion => {
                        return discussion.workspaceId !== workspaceId
                            && discussion.commentThreadId !== discussionId
                    }),
                    updatedDicussion
                ]
            }))
            return updatedDicussion;
        },
    }),
    {
        name: "comments-storage",
        storage: createJSONStorage(() => localStorage),
    }
))