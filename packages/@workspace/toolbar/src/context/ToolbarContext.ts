import { createContext, Dispatch, SetStateAction } from "react";

export const ToolbarContext = createContext<{
    toolbarNode?: HTMLDivElement;
    setToolbarNode: Dispatch<SetStateAction<HTMLDivElement>>;
}>({
    toolbarNode: null,
    setToolbarNode: () => { }
});