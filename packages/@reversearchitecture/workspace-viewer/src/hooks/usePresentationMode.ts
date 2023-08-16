import { useStoreApi } from "@reactflow/core";
import { useCallback } from "react";
import { useWorkspaceToolbarStore } from "../hooks";

export const usePresentationMode = () => {
    const { isPresentationEnabled } = useWorkspaceToolbarStore();
    const { setState } = useStoreApi();

    const enablePresentationMode = useCallback(() => {
        useWorkspaceToolbarStore.setState({
            isPresentationEnabled: true,
        });
        setState({
            nodesDraggable: false,
            nodesConnectable: false,
            elementsSelectable: true,
        });
    }, [setState]);

    const disablePresentationMode = useCallback(() => {
        useWorkspaceToolbarStore.setState({
            isPresentationEnabled: false,
        });
    }, []);

    const togglePresentationMode = useCallback(() => {
        if (isPresentationEnabled) {
            disablePresentationMode();
        }
        else {
            enablePresentationMode();
        }
    }, [disablePresentationMode, enablePresentationMode, isPresentationEnabled]);

    return {
        enablePresentationMode,
        disablePresentationMode,
        togglePresentationMode
    }
}