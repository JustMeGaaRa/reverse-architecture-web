import { ScaleFade } from "@chakra-ui/react";
import {
    ForeignElement,
    useWorkspaceStore
} from "@workspace/core";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import {
    CommentApi,
    CommentBadge,
    CommentCacheWrapper,
    CommentThread,
    CommentThreadCard,
    useAccount,
    useCommentsStore
} from "../../../features";

export const WorkspaceDiscussionGroup: FC<{
    discussions: CommentThread[];
}> = ({
    discussions
}) => {
    const { workspace, selectedView } = useWorkspaceStore();
    const { account } = useAccount();
    const {
        commentThreads,
        selectedThreadId,
        setSelectedThreadId,
        setCommentThreads
    } = useCommentsStore();
    const { commentApi } = useMemo(() => ({ commentApi: new CommentCacheWrapper(new CommentApi()) }), []);

    useEffect(() => setCommentThreads(discussions), [discussions, setCommentThreads]);

    const handleOnBadgeClick = useCallback((commentThreadId?: string) => {
        setSelectedThreadId(commentThreadId);
    }, [setSelectedThreadId])

    const handleOnReply = useCallback((commentThreadId: string, text: string) => {
        commentApi.saveDiscussionReply(workspace.name,  commentThreadId, {
            commentId: v4(),
            commentThreadId: commentThreadId,
            author: account.username,
            createdDate: new Date().toLocaleString(),
            text: text
        })
    }, [commentApi, workspace.name, account]);

    const handleOnPrevious = useCallback(() => {

    }, []);

    const handleOnNext = useCallback(() => {

    }, []);

    const handleOnResolve = useCallback(() => {

    }, []);

    const handleOnDelete = useCallback((commentThreadId: string) => {
        commentApi.deleteDiscussions(workspace.name, commentThreadId);
    }, [commentApi, workspace.name]);

    const handleOnClose = useCallback(() => {
        setSelectedThreadId(undefined);
    }, [setSelectedThreadId]);

    const filteredDiscussion = commentThreads.filter(x => {
        return x.metadata
            && x.metadata.view.type === selectedView.type
            && x.metadata.view.id === selectedView.identifier
    })

    return (
        <>
            {filteredDiscussion.map(thread => (
                <ForeignElement
                    key={thread.commentThreadId}
                    position={thread.metadata.position}
                >
                    <CommentBadge
                        commentThread={thread}
                        onClick={handleOnBadgeClick}
                    />
                    <ScaleFade in={thread.commentThreadId === selectedThreadId}>
                        {thread.commentThreadId === selectedThreadId && (
                            <CommentThreadCard
                                commentThread={thread}
                                onReply={(text) => handleOnReply(thread.commentThreadId, text)}
                                onPrevious={handleOnPrevious}
                                onNext={handleOnNext}
                                onResolve={handleOnResolve}
                                onDelete={() => handleOnDelete(thread.commentThreadId)}
                                onClose={handleOnClose}
                            />
                        )}
                    </ScaleFade>
                </ForeignElement>
            ))}
        </>
    )
}