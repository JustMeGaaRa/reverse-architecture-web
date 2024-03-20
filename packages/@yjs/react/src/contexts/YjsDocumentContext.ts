import { createContext, Dispatch, SetStateAction } from "react";
import * as Y from "yjs";

export const YjsDocumentContext = createContext<{
    document: Y.Doc;
    setDocument: Dispatch<SetStateAction<Y.Doc>>;
}>({
    document: null,
    setDocument: () => { console.debug("Workspace Collaborative Context: dummy setDocument") },
});