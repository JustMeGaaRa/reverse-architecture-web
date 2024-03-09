import { createContext, Dispatch, SetStateAction } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import { Workspace, WorkspaceInfo } from "../types";

export const WorkspaceExplorerContext = createContext<{
    workspaces: Array<WorkspaceInfo>;
    setWorkspaces: Dispatch<SetStateAction<Array<WorkspaceInfo>>>;
}>({
    workspaces: [],
    setWorkspaces: () => { console.log("Workspace Explorer Context: dummy setWorkspaces") },
});

export const WorkspaceContext = createContext<{
    workspace: Workspace;
    setWorkspace: Dispatch<SetStateAction<Workspace>>;
}>({
    workspace: null,
    setWorkspace: () => { console.log("Workspace Context: dummy setWorkspace") },
});

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