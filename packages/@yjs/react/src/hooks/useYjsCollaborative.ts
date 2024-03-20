import { useContext } from "react";
import {
    YjsDocumentContext,
    YjsIndexeddbPersistenceContext,
    YjsWebrtcProviderContext,
    YjsUndoManagerContext
} from "../contexts";

export const useYjsCollaborative = () => {
    const { document, setDocument } = useContext(YjsDocumentContext);
    const { persistance, setPersistance } = useContext(YjsIndexeddbPersistenceContext);
    const { connection, setConnection } = useContext(YjsWebrtcProviderContext);
    const { undoManager, setUndoManager } = useContext(YjsUndoManagerContext);

    return {
        document,
        persistance,
        connection,
        undoManager,
        setDocument,
        setPersistance,
        setConnection,
        setUndoManager
    }
}