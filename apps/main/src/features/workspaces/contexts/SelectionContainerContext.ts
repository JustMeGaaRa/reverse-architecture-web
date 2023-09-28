import { createContext, Dispatch, SetStateAction } from "react";

export const SelectionContainerContext = createContext<{
    isSelectionModeOn: boolean;
    selectedIndicies: number[];
    setIsSelectionModeOn: Dispatch<SetStateAction<boolean>>;
    setSelectedIndicies: Dispatch<SetStateAction<number[]>>;
}>({
    isSelectionModeOn: false,
    selectedIndicies: [],
    setIsSelectionModeOn: () => {},
    setSelectedIndicies: () => {},
});