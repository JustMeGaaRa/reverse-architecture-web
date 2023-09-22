import { ScaleFade } from "@chakra-ui/react";
import {
    ForeignElement,
    useWorkspaceStore
} from "@reversearchitecture/workspace-viewer";
import { FC, useCallback, useState } from "react";
import { v4 } from "uuid";
import {
    CommentApi,
    CommentBadge,
    CommentThreadCard,
    useAccount,
    useCommentsStore
} from "../../features";

export const WorkspaceCommentGroup: FC = () => {
    const { workspace, selectedView } = useWorkspaceStore();
    const { account } = useAccount();
    const {
        commentThreads,
        selectedThreadId,
        setSelectedThreadId
    } = useCommentsStore();
    const [ commentApi ] = useState(new CommentApi());
    
    const threads = commentThreads.filter(x => 
        x.metadata.view.type === selectedView.type
        && x.metadata.view.id === selectedView.identifier);

    const handleOnBadgeClick = useCallback((commentThreadId?: string) => {
        setSelectedThreadId(commentThreadId);
    }, [setSelectedThreadId])

    const handleOnReply = useCallback((commentThreadId: string, text: string) => {
        commentApi.saveCommentThreadReply(workspace.name,  commentThreadId, {
            commentId: v4(),
            commentThreadId: commentThreadId,
            author: account.name,
            createdDate: new Date().toLocaleString(),
            text: text
        })
    }, [commentApi, workspace.name, account]);

    const handleOnPrevious = useCallback(() => {

    }, []);

    const handleOnNext = useCallback(() => {

    }, []);

    const handleOnResolve = useCallback(() => {

    }, []);

    const handleOnDelete = useCallback((commentThreadId: string) => {
        commentApi.deleteCommentThread(workspace.name, commentThreadId);
    }, [commentApi, workspace.name]);

    const handleOnClose = useCallback(() => {
        setSelectedThreadId(undefined);
    }, [setSelectedThreadId]);

    return (
        <>
            {threads.map(thread => (
                <ForeignElement
                    key={thread.commentThreadId}
                    position={thread.metadata.position}
                >
                    <CommentBadge
                        commentThread={thread}
                        onClick={handleOnBadgeClick}
                    />
                    <ScaleFade in={thread.commentThreadId === selectedThreadId} >
                        <CommentThreadCard
                            commentThread={thread}
                            onReply={(text) => handleOnReply(thread.commentThreadId, text)}
                            onPrevious={handleOnPrevious}
                            onNext={handleOnNext}
                            onResolve={handleOnResolve}
                            onDelete={() => handleOnDelete(thread.commentThreadId)}
                            onClose={handleOnClose}
                        />
                    </ScaleFade>
                </ForeignElement>
            ))}
        </>
    )
}