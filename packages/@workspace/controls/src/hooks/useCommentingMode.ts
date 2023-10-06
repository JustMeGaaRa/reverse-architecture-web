import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "@workspace/core";

export const useCommentingMode = () => {
    const enableCommentingMode = useCallback(() => {
        useWorkspaceToolbarStore.setState({
            isSelectionEnabled: false,
            isDraggingEnabled: false,
            isAddingElementEnabled: false,
            isConnectionLineEnabled: false,
            isTextEditEnabled: false,
            isMultiSelectEnabled: false,
            isCommentAddingEnabled: true,
        });
    }, []);

    return { enableCommentingMode };
}