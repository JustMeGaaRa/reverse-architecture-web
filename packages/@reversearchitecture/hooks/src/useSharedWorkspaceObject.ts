import { useState } from "react";
import * as Y from "yjs";

export const useSharedWorkspaceObject = () => {
    // TODO: change useState to zustand store with a Y.Doc
    const [sharedWorkspaceObject, setSharedWorkspaceObject] = useState<Y.Doc>();

    return {
        sharedWorkspaceObject,
        setSharedWorkspaceObject
    }
}