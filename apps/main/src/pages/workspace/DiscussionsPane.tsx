import { Box, ScaleFade } from "@chakra-ui/react";
import {
    NodeRelativeElement,
    ViewportStaticElement,
    WorkspaceElementPortal,
    useWorkspace,
    useWorkspaceNavigation,
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
} from "../../features";

export const DiscussionsPane: FC<{
    discussions: CommentThread[];
}> = ({
    discussions
}) => {
    const { workspace } = useWorkspace();
    const { currentView } = useWorkspaceNavigation();
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
            && x.metadata.view.type === currentView.type
            && x.metadata.view.id === currentView.identifier
    });
    const elementRelativeDiscussions = viewDiscussions.filter(x => x.metadata?.elementId === undefined);
    const viewportRelativeDiscussions = viewDiscussions.filter(x => x.metadata?.elementId !== undefined);
    const selectedDiscussion = viewDiscussions.find(x => x.commentThreadId === selectedThreadId);

    return (
        <WorkspaceElementPortal>
            <Box
                className={"workspace__discussions-pane"}
                position={"absolute"}
                top={0}
                left={0}
                height={"100%"}
                width={"100%"}
            >
                {elementRelativeDiscussions.map(thread => (
                    <NodeRelativeElement
                        key={thread.commentThreadId}
                        nodeId={thread.metadata.elementId}
                    >
                        <CommentBadge
                            commentThread={thread}
                            onClick={handleOnBadgeClick}
                        />
                    </NodeRelativeElement>
                ))}
                
                {viewportRelativeDiscussions.map(thread => (
                    <ViewportStaticElement
                        key={thread.commentThreadId}
                        position={thread.metadata.position}
                    >
                        <CommentBadge
                            commentThread={thread}
                            onClick={handleOnBadgeClick}
                        />
                    </ViewportStaticElement>
                ))}
                
                {selectedDiscussion && (
                    <NodeRelativeElement
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
                    </NodeRelativeElement>
                )}
            </Box>
        </WorkspaceElementPortal>
    )
}