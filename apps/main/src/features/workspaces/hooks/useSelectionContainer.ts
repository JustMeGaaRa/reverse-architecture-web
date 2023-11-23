import { useCallback, useContext } from "react";
import { SelectionContainerContext } from "../contexts";

export const useSelectionContainer = () => {
    const {
        isSelectionModeOn,
        selectedIndicies,
        setIsSelectionModeOn,
        setSelectedIndicies
    } = useContext(SelectionContainerContext);

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

    const clearSelected = useCallback(() => {
        setSelectedIndicies([]);
    }, [setSelectedIndicies]);

    const turnOnSelectionMode = useCallback(() => {
        setIsSelectionModeOn(true);
    }, [setIsSelectionModeOn]);

    const turnOffSelectionMode = useCallback(() => {
        setIsSelectionModeOn(false);
    }, [setIsSelectionModeOn]);

    return {
        isSelectionModeOn,
        selectedIndicies,
        turnOnSelectionMode,
        turnOffSelectionMode,
        setSelectedIndicies,
        setSelected,
        setUnselected,
        toggleSelected,
        clearSelected,
    }
}