import { useCallback, useContext } from "react";
import { WorkspaceCollectionContext } from "../contexts";

export const useWorkspaceCollection = () => {
    const {
        isSelectionModeOn,
        selectedIndicies,
        setIsSelectionModeOn,
        setSelectedIndicies
    } = useContext(WorkspaceCollectionContext);

    const setSelected = useCallback((key: string) => {
        setSelectedIndicies(indicies => {
            return Array.from(new Set([...indicies, key]))
        });
    }, [setSelectedIndicies]);

    const setUnselected = useCallback((key: string) => {
        setSelectedIndicies(indicies => {
            return indicies.filter(x => x !== key);
        });
    }, [setSelectedIndicies]);

    const toggleSelected = useCallback((key: string) => {
        setSelectedIndicies(indicies => {
            return indicies.includes(key)
                ? indicies.filter(x => x !== key)
                : [...indicies, key];
        });
    }, [setSelectedIndicies]);

    const selectionModeOn = useCallback(() => {
        setIsSelectionModeOn(true);
    }, [setIsSelectionModeOn]);

    const selectionModeOff = useCallback(() => {
        setIsSelectionModeOn(false);
    }, [setIsSelectionModeOn]);

    const clearSelected = useCallback(() => {
        setSelectedIndicies([]);
        selectionModeOff();
    }, [setSelectedIndicies, selectionModeOff]);

    return {
        isSelectionModeOn,
        selectedIndicies,
        turnOnSelectionMode: selectionModeOn,
        turnOffSelectionMode: selectionModeOff,
        setSelectedIndicies,
        setSelected,
        setUnselected,
        toggleSelected,
        clearSelected,
    }
}