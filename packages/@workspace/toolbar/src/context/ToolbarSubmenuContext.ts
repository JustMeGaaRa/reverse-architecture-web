import { createContext } from "react";

export const ToolbarSubmenuContext = createContext<{
    isOpen: boolean;
    onToggle: () => void;
}>({
    isOpen: false,
    onToggle: () => { }
});