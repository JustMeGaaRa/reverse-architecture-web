import { createContext } from "react";
import { CommentThread } from "../types";

export const CommentContext = createContext<{
    selectedThreadId?: string;
    commentThreads: CommentThread[];
    setCommentThreads: (comments: CommentThread[]) => void;
    setSelectedThreadId: (commentThreadId?: string) => void;
}>({
    commentThreads: [],
    setCommentThreads: () => {},
    setSelectedThreadId: () => {},
});