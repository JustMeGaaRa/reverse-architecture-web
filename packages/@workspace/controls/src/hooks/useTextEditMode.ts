import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "@workspace/core";

export const useTextEditMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();

    const enableTextEditMode = useCallback(() => {
        setEnabledTool("text-edit");
    }, [setEnabledTool]);

    return {
        isTextEditEnabled: enabledTool === "text-edit",
        enableTextEditMode
    }
}