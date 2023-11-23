import { createContext, Dispatch, SetStateAction } from "react";

export const SelectionContainerContext = createContext<{
    isSelectionModeOn: boolean;
    selectedIndicies: string[];
    setIsSelectionModeOn: Dispatch<SetStateAction<boolean>>;
    setSelectedIndicies: Dispatch<SetStateAction<string[]>>;
}>({
    isSelectionModeOn: false,
    selectedIndicies: [],
    setIsSelectionModeOn: () => {},
    setSelectedIndicies: () => {},
});