import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { Linear } from "iconoir-react";
import { FC } from "react";
import { useTextEditMode } from "../hooks";

export const ConnectionModeButton: FC = () => {
    const { } = useWorkspaceToolbarStore();
    const { } = useTextEditMode();

    return (
        <IconButton
            aria-label={"connection mode"}
            aria-selected={false}
            icon={<Linear />}
            title={"connection mode"}
        />
    )
}