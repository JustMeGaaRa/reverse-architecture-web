import { IconButton } from "@chakra-ui/react";
import { ChatPlusIn } from "iconoir-react";
import { FC } from "react";
import { useCommentingMode } from "../hooks";

export const CommentingModeButton: FC = () => {
    const { isCommentingModeEnabled, enableCommentingMode } = useCommentingMode();

    return (
        <IconButton
            aria-label={"add comment"}
            aria-selected={isCommentingModeEnabled}
            icon={<ChatPlusIn />}
            title={"add comment"}
            onClick={() => enableCommentingMode()}
        />
    )
}