import { FC, PropsWithChildren, useState } from "react";
import { IndexeddbPersistence } from "y-indexeddb";
import { YjsIndexeddbPersistenceContext } from "../contexts";

export const YjsIndexeddbPersistanceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ persistance, setPersistance ] = useState<IndexeddbPersistence>();

    return (
        <YjsIndexeddbPersistenceContext.Provider value={{ persistance, setPersistance }}>
            {children}
        </YjsIndexeddbPersistenceContext.Provider>
    )
}