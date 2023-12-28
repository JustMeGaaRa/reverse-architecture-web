import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { ChatPlusIn } from "iconoir-react";
import { FC } from "react";
import { useCommentingMode } from "../hooks";

export const CommentingModeButton: FC = () => {
    const { isCommentAddingEnabled } = useWorkspaceToolbarStore();
    const { enableCommentingMode } = useCommentingMode();

    return (
        <IconButton
            aria-label={"add comment"}
            aria-selected={isCommentAddingEnabled}
            icon={<ChatPlusIn />}
            title={"add comment"}
            onClick={() => enableCommentingMode()}
        />
    )
}