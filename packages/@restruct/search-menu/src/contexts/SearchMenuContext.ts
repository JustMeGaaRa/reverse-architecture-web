import { createContext } from "react";

export const SearchMenuContext = createContext<{
    isOpen: boolean;
    onClose: () => void;
}>({
    isOpen: false,
    onClose: () => {}
});