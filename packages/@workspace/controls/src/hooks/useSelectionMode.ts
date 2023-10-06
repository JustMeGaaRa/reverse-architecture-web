import { useStoreApi } from "@reactflow/core";
import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "@workspace/core";

export const useSelectionMode = () => {
    const { setState } = useStoreApi();

    const enableSelectionMode = useCallback(() => {
        setState({
            nodesDraggable: true,
            nodesConnectable: true,
            elementsSelectable: true,
        });
        useWorkspaceToolbarStore.setState({
            isSelectionEnabled: true,
            isDraggingEnabled: false,
            isAddingElementEnabled: false,
            isConnectionLineEnabled: false,
            isTextEditEnabled: false,
            isMultiSelectEnabled: false,
            isCommentAddingEnabled: false,
        })
    }, [setState]);

    return { enableSelectionMode }
}