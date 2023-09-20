import {
    VStack
} from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import {
    useViewNavigation,
} from "@reversearchitecture/workspace-viewer";
import {
    FC,
    useCallback,
    useEffect,
} from "react";
import { CommentCard } from "../components";
import { useCommentsStore } from "../hooks";
import { CommentThread } from "../types";

export const CommentList: FC<{
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
                <CommentCard
                    key={thread.commentThreadId}
                    commentThreadId={thread.commentThreadId}
                    author={thread.author}
                    source={thread.metadata.view}
                    text={thread.text}
                    createdAt={thread.createdDate}
                    onClick={() => handleOnClick(thread)}
                />
            ))}
        </VStack>
    )
}
