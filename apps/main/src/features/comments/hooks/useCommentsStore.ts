import { useContext, useEffect } from "react";
import { CommentContext } from "../contexts";
import { CommentThread } from "../types";

export const useCommentsStore = () => {
    return useContext(CommentContext);
}

export const useOnSelectedCommentChange = (callback: (thread?: CommentThread) => void) => {
    const { selectedThreadId, commentThreads } = useCommentsStore();

    useEffect(() => {
        callback?.(commentThreads.find((thread) => thread.commentThreadId === selectedThreadId));
    }, [selectedThreadId, commentThreads, callback]);
}