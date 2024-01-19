import { useWorkspaceToolbarStore } from "@workspace/core";
import { useCallback } from "react";

export const useDraggingMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();
    
    const enableDraggingMode = useCallback(() => {
        setEnabledTool("dragging");
    }, [setEnabledTool]);

    return {
        isDraggingModeEnabled: enabledTool === "dragging",
        enableDraggingMode
    };
}

export const useSelectionMode = () => {
    const { enabledTool, setEnabledTool } = useWorkspaceToolbarStore();
    
    const enableSelectionMode = useCallback(() => {
        setEnabledTool("selection");
    }, [setEnabledTool]);

    return {
        isSelectionModeEnabled: enabledTool === "selection",
        enableSelectionMode
    };
}