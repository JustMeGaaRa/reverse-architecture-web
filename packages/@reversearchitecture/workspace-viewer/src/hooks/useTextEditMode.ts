import { useStoreApi } from "@reactflow/core";
import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "../hooks";

export const useTextEditMode = () => {
    const { setState } = useStoreApi();

    const enableTextEditMode = useCallback(() => {
        setState({
            nodesDraggable: false,
            nodesConnectable: false,
            elementsSelectable: true,
        });
        useWorkspaceToolbarStore.setState({
            isSelectionEnabled: false,
            isDraggingEnabled: false,
            isAddingElementEnabled: false,
            isConnectionLineEnabled: false,
            isTextEditEnabled: true,
            isMultiSelectEnabled: false,
            isCommentAddingEnabled: false,
        });
    }, [setState]);

    return { enableTextEditMode }
}