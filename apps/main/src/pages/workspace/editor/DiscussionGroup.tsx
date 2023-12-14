import { Box, ScaleFade } from "@chakra-ui/react";
import {
    WorkspaceNodeRelativeWrapper,
    useWorkspaceStore,
    WorkspaceViewportRelativerWrapper,
    WorkspaceElementPortal
} from "@workspace/core";
import { FC, useCallback, useEffect, useMemo } from "react";
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

export const DiscussionGroup: FC<{
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

    const viewDiscussions = commentThreads.filter(x => {
        return x.metadata
            && x.metadata.view.type === selectedView.type
            && x.metadata.view.id === selectedView.identifier
    });
    const elementRelativeDiscussions = viewDiscussions.filter(x => x.metadata?.elementId === undefined);
    const viewportRelativeDiscussions = viewDiscussions.filter(x => x.metadata?.elementId !== undefined);
    const selectedDiscussion = viewDiscussions.find(x => x.commentThreadId === selectedThreadId);

    return (
        <WorkspaceElementPortal>
            <Box
                className={"workspace__discussion-group"}
                position={"absolute"}
                top={0}
                left={0}
                height={"100%"}
                width={"100%"}
            >
                {elementRelativeDiscussions.map(thread => (
                    <WorkspaceNodeRelativeWrapper
                        key={thread.commentThreadId}
                        nodeId={thread.metadata.elementId}
                    >
                        <CommentBadge
                            commentThread={thread}
                            onClick={handleOnBadgeClick}
                        />
                    </WorkspaceNodeRelativeWrapper>
                ))}
                
                {viewportRelativeDiscussions.map(thread => (
                    <WorkspaceViewportRelativerWrapper
                        key={thread.commentThreadId}
                        position={thread.metadata.position}
                    >
                        <CommentBadge
                            commentThread={thread}
                            onClick={handleOnBadgeClick}
                        />
                    </WorkspaceViewportRelativerWrapper>
                ))}
                
                {selectedDiscussion && (
                    <WorkspaceNodeRelativeWrapper
                        key={selectedDiscussion.commentThreadId}
                        nodeId={selectedDiscussion.metadata.elementId}
                    >
                        <ScaleFade key={selectedDiscussion.commentThreadId} in={true}>
                            <CommentThreadCard
                                commentThread={selectedDiscussion}
                                onReply={(text) => handleOnReply(selectedDiscussion.commentThreadId, text)}
                                onPrevious={handleOnPrevious}
                                onNext={handleOnNext}
                                onResolve={handleOnResolve}
                                onDelete={() => handleOnDelete(selectedDiscussion.commentThreadId)}
                                onClose={handleOnClose}
                            />
                        </ScaleFade>
                    </WorkspaceNodeRelativeWrapper>
                )}
            </Box>
        </WorkspaceElementPortal>
    )
}