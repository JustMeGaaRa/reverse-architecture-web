import { createContext } from "react";

export const SelectionItemContext = createContext<{
    index: number;
    isSelected?: boolean;
}>({
    index: -1,
    isSelected: undefined,
});