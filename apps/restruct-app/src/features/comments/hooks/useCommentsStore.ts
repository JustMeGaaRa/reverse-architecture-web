import { useContext, useEffect, useState } from "react";
import { CommentContext } from "../contexts";
import { CommentThread } from "../types";

export const useCommentsStore = () => {
    const {
        commentThreads,
        highlightThreadId,
        selectedThreadId,
        setCommentThreads,
        setHighlightThreadId,
        setSelectedThreadId
    } = useContext(CommentContext);

    return {
        commentThreads,
        highlightThreadId,
        selectedThreadId,
        setCommentThreads,
        setHighlightThreadId,
        setSelectedThreadId
    }
}

export const useOnSelectedCommentChange = (callback: (thread?: CommentThread) => void) => {
    const { selectedThreadId, commentThreads } = useCommentsStore();

    useEffect(() => {
        callback?.(commentThreads.find((thread) => thread.commentThreadId === selectedThreadId));
    }, [selectedThreadId, commentThreads, callback]);
}