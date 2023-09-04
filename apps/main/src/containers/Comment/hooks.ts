import { useContext, useEffect } from "react";
import { CommentContext } from "./context";
import { IComment } from "./types";

export const useComments = () => {
    return useContext(CommentContext);
}

export const useOnSelectedCommentChange = (callback: (comment?: IComment) => void) => {
    const { selectedCommentId, comments } = useComments();

    useEffect(() => {
        callback?.(comments.find((comment) => comment.commentId === selectedCommentId));
    }, [selectedCommentId, comments, callback]);
}