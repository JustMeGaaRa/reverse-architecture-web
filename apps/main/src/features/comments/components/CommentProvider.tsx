import { useYjsCollaborative } from "@yjs/react";
import { FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from "react";
import { Transaction, YMapEvent } from "yjs";
import { CommentContext } from "../contexts";
import { CommentThread } from "../types";

export const CommentProvider: FC<PropsWithChildren<{
    initialDiscussions?: Array<CommentThread>;
}>> = ({
    children,
    initialDiscussions
}) => {
    const { document } = useYjsCollaborative();
    const [ commentThreads, setCommentThreads ] = useState([]);
    const [ selectedThreadId, setSelectedThreadId ] = useState<string>();
    const [ highlightThreadId, setHighlightThreadId ] = useState<string>();

    useEffect(() => setCommentThreads(initialDiscussions ?? []), [initialDiscussions]);

    useEffect(() => {
        const onCommentcApplyRemoteChanges = (event: YMapEvent<unknown>, transaction: Transaction) => {
            if (!transaction.local) {
                // TODO: use array for more granular changes
                const discussionsJson = discussionsMap.get("discussions") as string;
                setCommentThreads(JSON.parse(discussionsJson) as Array<CommentThread>);
            }
        }

        const discussionsMap = document.getMap("discussions");
        discussionsMap.observe(onCommentcApplyRemoteChanges);

        return () => {
            discussionsMap.unobserve(onCommentcApplyRemoteChanges);
        }
    }, [document, setCommentThreads]);

    const onCommentsPublishLocalChanges = useCallback((action: SetStateAction<Array<CommentThread>>) => {
        setCommentThreads(prevState => {
            const newState = typeof action === "function" ? action(prevState) : action;

            const discussionsMap = document.getMap("discussions");
            discussionsMap.set("discussions", JSON.stringify(newState));

            return newState;
        })
    }, [document]);

    return (
        <CommentContext.Provider
            value={{
                selectedThreadId,
                highlightThreadId,
                commentThreads,
                setCommentThreads: onCommentsPublishLocalChanges,
                setSelectedThreadId,
                setHighlightThreadId
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}