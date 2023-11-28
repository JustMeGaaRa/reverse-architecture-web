import { Box } from "@chakra-ui/react";
import { useViewNavigation } from "@workspace/diagramming";
import { FC, useCallback, useEffect } from "react";
import { CommentCard, CommentGroup } from "../../../features/comments/components";
import { useCommentsStore } from "../../../features/comments/hooks";
import { CommentThread } from "../../../features/comments/types";

export const CommentThreadList: FC<{
    commentThreads: CommentThread[];
}> = ({
    commentThreads: threads
}) => {
    const {
        commentThreads,
        selectedThreadId,
        setCommentThreads,
        setSelectedThreadId
    } = useCommentsStore();
    const { zoomIntoView } = useViewNavigation();

    useEffect(() => setCommentThreads(threads), [threads, setCommentThreads]);

    const handleOnClick = useCallback((comment: CommentThread) => {
        const isCurrent = selectedThreadId === comment.commentThreadId;
        setSelectedThreadId(isCurrent ? undefined : comment.commentThreadId);
        zoomIntoView({ type: comment.metadata.view.type as any, identifier: comment.metadata.view.id });
    }, [selectedThreadId, setSelectedThreadId, zoomIntoView]);

    return (
        <Box
            height={"100%"}
            width={"100%"}
            paddingX={2}
            paddingY={4}
            overflowY={"scroll"}
        >
            <CommentGroup>
                {commentThreads.map(thread => (
                    <CommentCard
                        key={thread.commentThreadId}
                        comment={thread.comments.at(0)}
                        replyCount={thread.comments.length}
                        origin={thread.metadata.view}
                        isSelected={selectedThreadId === thread.commentThreadId}
                        showOrigin={true}
                        showResolve={true}
                        showOptions={true}
                        showReplies={true}
                        onClick={() => handleOnClick(thread)}
                    />
                ))}
            </CommentGroup>
        </Box>
    )
}
