import { createContext, Dispatch, SetStateAction } from "react";
import * as Y from "yjs";

export const YjsUndoManagerContext = createContext<{
    undoManager: Y.UndoManager;
    setUndoManager: Dispatch<SetStateAction<Y.UndoManager>>;
}>({
    undoManager: null,
    setUndoManager: () => { console.debug("Workspace Collaborative Context: dummy setUndoManager") },
});