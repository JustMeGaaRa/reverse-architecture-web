import { FC, PropsWithChildren, useState } from "react";
import { CommentContext } from "../contexts";

export const CommentProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ commentThreads, setCommentThreads ] = useState([]);
    const [ selectedThreadId, setSelectedThreadId ] = useState<string>();
    const [ highlightThreadId, setHighlightThreadId ] = useState<string>();

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