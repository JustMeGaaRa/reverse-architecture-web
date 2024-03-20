import { createContext, Dispatch, SetStateAction } from "react";
import { IndexeddbPersistence } from "y-indexeddb";

export const YjsIndexeddbPersistenceContext = createContext<{
    persistance: IndexeddbPersistence;
    setPersistance: Dispatch<SetStateAction<IndexeddbPersistence>>;
}>({
    persistance: null,
    setPersistance: () => { console.debug("Workspace Collaborative Context: dummy setPersistance") },
});