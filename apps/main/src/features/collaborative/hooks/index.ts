import { useContext } from "react";
import {
    YjsDocumentContext,
    WorkspaceContext,
    WorkspaceExplorerContext,
    YjsIndexeddbPersistenceContext,
    YjsWebrtcProviderContext,
    YjsUndoManagerContext
} from "../contexts";

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
}

export const useWorkspaceExplorer = () => {
    return useContext(WorkspaceExplorerContext);
}

export const useWorkspaceCollaborative = () => {
    const { document, setDocument } = useContext(YjsDocumentContext);
    const { persistance, setPersistance } = useContext(YjsIndexeddbPersistenceContext);
    const { connection, setConnection } = useContext(YjsWebrtcProviderContext);
    const { undoManager, setUndoManager } = useContext(YjsUndoManagerContext);

    return {
        document,
        setDocument,
        persistance,
        setPersistance,
        connection,
        setConnection,
        undoManager,
        setUndoManager
    }
}