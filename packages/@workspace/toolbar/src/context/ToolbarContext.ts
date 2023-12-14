import { createContext } from "react";

export const ToolbarContext = createContext<{
    toolbarDomNode?: HTMLDivElement;
    selectedIndex?: number;
    setSelectedIndex?: (index: number) => void;
}>({
    toolbarDomNode: null
});