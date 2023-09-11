import { useContext, useEffect } from "react";
import { CommentInfo } from "../../model";
import { CommentContext } from "./context";

export const useComments = () => {
    return useContext(CommentContext);
}

export const useOnSelectedCommentChange = (callback: (comment?: CommentInfo) => void) => {
    const { selectedCommentId, comments } = useComments();

    useEffect(() => {
        callback?.(comments.find((comment) => comment.commentId === selectedCommentId));
    }, [selectedCommentId, comments, callback]);
}