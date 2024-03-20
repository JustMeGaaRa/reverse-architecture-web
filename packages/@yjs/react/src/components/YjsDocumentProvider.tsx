import { FC, PropsWithChildren, useState } from "react";
import * as Y from "yjs";
import { YjsDocumentContext } from "../contexts";

export const YjsDocumentProvider: FC<PropsWithChildren<{ guid?: string }>> = ({ children, guid }) => {
    const [ document, setDocument ] = useState<Y.Doc>(new Y.Doc({ guid }));

    return (
        <YjsDocumentContext.Provider value={{ document, setDocument }}>
            {children}
        </YjsDocumentContext.Provider>
    )
}