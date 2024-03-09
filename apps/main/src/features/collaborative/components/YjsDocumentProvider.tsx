import { FC, PropsWithChildren, useState } from "react";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { WebrtcProvider } from "y-webrtc";
import {
    YjsDocumentContext,
    YjsIndexeddbPersistenceContext,
    YjsUndoManagerContext,
    YjsWebrtcProviderContext
} from "../contexts";

export const YjsDocumentProvider: FC<PropsWithChildren<{ guid?: string }>> = ({ children, guid }) => {
    const [ document, setDocument ] = useState<Y.Doc>(new Y.Doc({ guid }));

    return (
        <YjsDocumentContext.Provider value={{ document, setDocument }}>
            {children}
        </YjsDocumentContext.Provider>
    )
}

export const YjsUndoManagerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ undoManager, setUndoManager ] = useState<Y.UndoManager>();

    return (
        <YjsUndoManagerContext.Provider value={{ undoManager, setUndoManager }}>
            {children}
        </YjsUndoManagerContext.Provider>
    )
}

export const YjsIndexeddbPersistanceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ persistance, setPersistance ] = useState<IndexeddbPersistence>();

    return (
        <YjsIndexeddbPersistenceContext.Provider value={{ persistance, setPersistance }}>
            {children}
        </YjsIndexeddbPersistenceContext.Provider>
    )
}

export const YjsWebrtcProviderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ connection, setConnection ] = useState<WebrtcProvider>();

    return (
        <YjsWebrtcProviderContext.Provider value={{ connection, setConnection }}>
            {children}
        </YjsWebrtcProviderContext.Provider>
    )
}