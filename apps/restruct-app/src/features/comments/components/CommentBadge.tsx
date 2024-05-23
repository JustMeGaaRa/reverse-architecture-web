import { Avatar, AvatarGroup, Box } from "@chakra-ui/react";
import { FC } from "react";
import { CommentThread } from "../types";

export const CommentBadge: FC<{
    commentThread: CommentThread;
    onClick?: (commentThreadId?: string) => void;
}> = ({
    commentThread,
    onClick
}) => {
    const uniqueCommenters = Array
        .from((new Set(commentThread.comments.map(x => x.author)))
        .values());

    return (
        <Box
            backgroundColor={"gray.400"}
            borderRadius={16}
            padding={1}
            width={"fit-content"}
            onClick={() => onClick?.(commentThread.commentThreadId)}
        >
            <AvatarGroup max={3} size={"sm"}>
                {uniqueCommenters.map(author => (
                    <Avatar
                        key={author}
                        cursor={"pointer"}
                        name={author}
                        title={author}
                    />
                ))}
            </AvatarGroup>
        </Box>
    )
}