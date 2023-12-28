import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { Text } from "iconoir-react";
import { FC } from "react";
import { useTextEditMode } from "../hooks";

export const TextEditModeButton: FC = () => {
    const { isTextEditEnabled } = useWorkspaceToolbarStore();
    const { enableTextEditMode } = useTextEditMode();

    return (
        <IconButton
            aria-label={"text edit mode"}
            aria-selected={isTextEditEnabled}
            icon={<Text />}
            title={"text edit mode"}
            onClick={() => enableTextEditMode()}
        />
    )
}