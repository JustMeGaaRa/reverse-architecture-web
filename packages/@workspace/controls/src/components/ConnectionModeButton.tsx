import { IconButton } from "@chakra-ui/react";
import { useWorkspaceToolbarStore } from "@workspace/core";
import { Linear } from "iconoir-react";
import { FC, useCallback } from "react";

export const ConnectionModeButton: FC = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();

    const enableConnectionMode = useCallback(() => {
        setEnabledTool("connection");
    }, [setEnabledTool]);

    return (
        <IconButton
            aria-label={"connection mode"}
            aria-selected={enabledTool === "connection"}
            icon={<Linear />}
            title={"connection mode"}
            onClick={() => enableConnectionMode()}
        />
    )
}