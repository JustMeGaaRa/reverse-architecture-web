import { VStack } from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { useViewNavigation } from "@workspace/diagramming";
import { FC, useCallback, useEffect } from "react";
import { CommentThreadRefrence } from "../components";
import { useCommentsStore } from "../hooks";
import { CommentThread } from "../types";

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
        <VStack padding={2} gap={1}>
            {commentThreads.map(thread => (
                <CommentThreadRefrence
                    key={thread.commentThreadId}
                    commentThreadId={thread.commentThreadId}
                    author={thread.comments.at(0).author}
                    text={thread.comments.at(0).text}
                    createdAt={thread.comments.at(0).createdDate}
                    reference={thread.metadata.view}
                    onClick={() => handleOnClick(thread)}
                />
            ))}
        </VStack>
    )
}
