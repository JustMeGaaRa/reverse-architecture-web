import { createContext, Dispatch, SetStateAction } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

export const YjsDocumentContext = createContext<{
    document: Y.Doc;
    setDocument: Dispatch<SetStateAction<Y.Doc>>;
}>({
    document: null,
    setDocument: () => { console.log("Workspace Collaborative Context: dummy setDocument") },
});

export const YjsIndexeddbPersistenceContext = createContext<{
    persistance: IndexeddbPersistence;
    setPersistance: Dispatch<SetStateAction<IndexeddbPersistence>>;
}>({
    persistance: null,
    setPersistance: () => { console.log("Workspace Collaborative Context: dummy setPersistance") },
});

export const YjsWebrtcProviderContext = createContext<{
    connection: WebrtcProvider;
    setConnection: Dispatch<SetStateAction<WebrtcProvider>>;
}>({
    connection: null,
    setConnection: () => { console.log("Workspace Collaborative Context: dummy setConnection") },
});

export const YjsUndoManagerContext = createContext<{
    undoManager: Y.UndoManager;
    setUndoManager: Dispatch<SetStateAction<Y.UndoManager>>;
}>({
    undoManager: null,
    setUndoManager: () => { console.log("Workspace Collaborative Context: dummy setUndoManager") },
});