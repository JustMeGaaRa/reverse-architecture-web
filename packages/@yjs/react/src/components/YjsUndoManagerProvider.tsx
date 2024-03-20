import { FC, PropsWithChildren, useState } from "react";
import * as Y from "yjs";
import { YjsUndoManagerContext } from "../contexts";

export const YjsUndoManagerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ undoManager, setUndoManager ] = useState<Y.UndoManager>();

    return (
        <YjsUndoManagerContext.Provider value={{ undoManager, setUndoManager }}>
            {children}
        </YjsUndoManagerContext.Provider>
    )
}