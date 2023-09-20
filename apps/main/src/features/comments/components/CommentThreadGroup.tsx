import { Avatar, AvatarGroup, Box } from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { useViewportUtils, useWorkspaceStore } from "@reversearchitecture/workspace-viewer";
import { FC } from "react";
import { useCommentsStore } from "../hooks";

export const CommentThreadGroup: FC<{
    onClick?: (commentThreadId?: string) => void;
}> = ({
    onClick
}) => {
    const {
        commentThreads,
        selectedThreadId,
        setSelectedThreadId
    } = useCommentsStore();
    const {
        getViewportPoint,
        getRenderingPoint
    } = useViewportUtils();
    const {
        selectedView
    } = useWorkspaceStore();
    
    const threads = commentThreads.filter(x => 
        x.metadata.view.type === selectedView.type
        && x.metadata.view.id === selectedView.identifier);

    return (
        <>
            {threads.map(thread => (
                <Box
                    key={thread.commentThreadId}
                    backgroundColor={"whiteAlpha.400"}
                    borderRadius={"16px"}
                    backdropFilter={"blur(8px)"}
                    padding={1}
                    position={"absolute"}
                    top={`${getRenderingPoint(thread.metadata.position)?.y ?? 0}px`}
                    left={`${getRenderingPoint(thread.metadata.position)?.x ?? 0}px`}
                    onClick={() => onClick?.(selectedThreadId)}
                    onMouseEnter={() => setSelectedThreadId(undefined)}
                    onMouseLeave={() => setSelectedThreadId(undefined)}
                >
                    <AvatarGroup max={3} size={"sm"}>
                        {Array.from((new Set(thread.replies.map(x => x.author).concat(thread.author))).values()).map(author => (
                            <Avatar
                                key={author}
                                cursor={"pointer"}
                                name={author}
                                title={author}
                            />
                        ))}
                    </AvatarGroup>
                </Box>
            ))}
        </>
    )
}