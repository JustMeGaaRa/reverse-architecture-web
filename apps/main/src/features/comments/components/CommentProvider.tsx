import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useWorkspaceRoom } from "workspace";
import { CommentContext } from "../contexts";
import { useCommentsStore } from "../hooks";
import { CommentThread } from "../types";

export const CommentProvider: FC<PropsWithChildren<{
    discussions?: Array<CommentThread>;
}>> = ({
    children,
    discussions
}) => {
    const [ commentThreads, setCommentThreads ] = useState([]);
    const [ selectedThreadId, setSelectedThreadId ] = useState<string>();
    const [ highlightThreadId, setHighlightThreadId ] = useState<string>();

    useEffect(() => setCommentThreads(discussions ?? []), [discussions]);

    return (
        <CommentContext.Provider
            value={{
                selectedThreadId,
                highlightThreadId,
                commentThreads,
                setCommentThreads,
                setSelectedThreadId,
                setHighlightThreadId
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export const CommentsRemoteObserver: FC<PropsWithChildren<{
    initialDiscussions?: Array<CommentThread>;
}>> = ({
    children,
    initialDiscussions
}) => {
    const { setCommentThreads } = useCommentsStore();
    const { workspaceDocument } = useWorkspaceRoom();

    useEffect(() => {
        const onCommentSyncLocal = () => {
            setCommentThreads(array.toArray());
        }

        const array = workspaceDocument.getArray<CommentThread>("discussions");
        array.observe(onCommentSyncLocal);

        return () => {
            array.unobserve(onCommentSyncLocal);
        }
    }, [workspaceDocument, setCommentThreads]);

    const onCommentsSyncRemote = useCallback(() => {

    }, []);

    return (
        <CommentProvider
            discussions={initialDiscussions}
            // onNewComment={onCommentsSyncRemote}
            // onUpdatedComment={onCommentsSyncRemote}
            // onRemovedComment={onCommentsSyncRemote}
        >
            {children}
        </CommentProvider>
    );
}

export const useCommentingMode = () => {
    const [ isCommentingModeEnabled, setIsCommentingModeEnabled ] = useState(false);

    return {
        isCommentingModeEnabled,
        setIsCommentingModeEnabled
    }
}