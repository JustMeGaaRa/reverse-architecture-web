import { useCallback, useContext } from "react";
import { SelectionContainerContext } from "../contexts";

export const useSelectionContainer = () => {
    const {
        isSelectionModeOn,
        selectedIndicies,
        setIsSelectionModeOn,
        setSelectedIndicies
    } = useContext(SelectionContainerContext);

    const setSelected = useCallback((index: number) => {
        setSelectedIndicies(indicies => {
            return Array.from(new Set([...indicies, index]))
        });
    }, [setSelectedIndicies]);

    const setUnselected = useCallback((index: number) => {
        setSelectedIndicies(indicies => {
            return indicies.filter(x => x !== index);
        });
    }, [setSelectedIndicies]);

    const toggleSelected = useCallback((index: number) => {
        setSelectedIndicies(indicies => {
            return indicies.includes(index)
                ? indicies.filter(x => x !== index)
                : [...indicies, index];
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