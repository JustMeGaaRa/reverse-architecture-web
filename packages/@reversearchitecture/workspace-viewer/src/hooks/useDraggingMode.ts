import { useStoreApi } from "@reactflow/core";
import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "../hooks";

export const useDraggingMode = () => {
    const { setState } = useStoreApi();

    const enableDraggingMode = useCallback(() => {
        setState({
            nodesDraggable: false,
            nodesConnectable: false,
            elementsSelectable: true,
        });
        useWorkspaceToolbarStore.setState({
            isSelectionEnabled: false,
            isDraggingEnabled: true,
            isAddingElementEnabled: false,
            isConnectionLineEnabled: false,
            isTextEditEnabled: false,
            isMultiSelectEnabled: false,
            isCommentAddingEnabled: false,
        })
    }, [setState]);

    return { enableDraggingMode }
}