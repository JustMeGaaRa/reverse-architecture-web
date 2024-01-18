import { Box } from "@chakra-ui/react";
import { useWorkspace, useWorkspaceNavigation } from "workspace";
import { FC, useCallback } from "react";
import { CommentCard, CommentGroup, CommentThread, useCommentsStore } from "../../../features";

export const CommentThreadList: FC<{
    discussions: CommentThread[];
}> = ({
    discussions
}) => {
    const {
        commentThreads,
        selectedThreadId,
        setCommentThreads,
        setSelectedThreadId
    } = useCommentsStore();
    const { workspace } = useWorkspace();
    const { openView } = useWorkspaceNavigation();

    // useEffect(() => setCommentThreads(discussions), [discussions, setCommentThreads]);

    const handleOnClick = useCallback((comment: CommentThread) => {
        const isCurrent = selectedThreadId === comment.commentThreadId;
        setSelectedThreadId(isCurrent ? undefined : comment.commentThreadId);
        openView(workspace, comment.metadata.view);
    }, [workspace, selectedThreadId, setSelectedThreadId, openView]);

    return (
        <Box
            height={"100%"}
            width={"100%"}
            paddingX={2}
            paddingY={4}
            overflowY={"scroll"}
        >
            <CommentGroup>
                {commentThreads.filter(discussion => discussion.metadata).map(discussion => (
                    <CommentCard
                        key={discussion.commentThreadId}
                        comment={discussion.comments.at(0)}
                        replyCount={discussion.comments.length}
                        origin={discussion.metadata.view}
                        isSelected={selectedThreadId === discussion.commentThreadId}
                        showOrigin={true}
                        showResolve={true}
                        showOptions={true}
                        showReplies={true}
                        onClick={() => handleOnClick(discussion)}
                    />
                ))}
            </CommentGroup>
        </Box>
    )
}
