import { createContext } from "react";

export const ToolbarSubmenuContext = createContext<{
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    onToggle: () => void;
}>({
    isOpen: false,
    onClose: () => { },
    onOpen: () => { },
    onToggle: () => { }
});