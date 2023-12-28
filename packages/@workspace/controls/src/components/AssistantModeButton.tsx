import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { MagicWand } from "iconoir-react";
import { FC } from "react";
import { useCommentingMode } from "../hooks";

export const AssistantModeButton: FC = () => {
    const { } = useWorkspaceToolbarStore();
    const { } = useCommentingMode();

    return (
        <IconButton
            aria-label={"assistant"}
            icon={<MagicWand />}
            title={"assistant"}
        />
    )
}