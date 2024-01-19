import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "@workspace/core";

export const useCommentingMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();

    const enableCommentingMode = useCallback(() => {
        setEnabledTool("commenting");
    }, [setEnabledTool]);

    return {
        isCommentingModeEnabled: enabledTool === "commenting",
        enableCommentingMode
    };
}