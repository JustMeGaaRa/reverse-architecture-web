import { FC, PropsWithChildren, useState } from "react";
import { CommentContext } from "../contexts";

export const CommentsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ commentThreads, setCommentThreads ] = useState([]);
    const [ selectedThreadId, setSelectedThreadId ] = useState<string>();

    return (
        <CommentContext.Provider
            value={{
                selectedThreadId,
                commentThreads,
                setCommentThreads,
                setSelectedThreadId
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}