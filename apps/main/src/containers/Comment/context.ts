import { createContext } from "react";

export const CommentContext = createContext<{
    selectedCommentId?: string;
    comments: any[];
    setComments: (comments: any[]) => void;
    setSelectedCommentId: (commentId?: string) => void;
}>({
    comments: [],
    setComments: () => {},
    setSelectedCommentId: () => {},
});