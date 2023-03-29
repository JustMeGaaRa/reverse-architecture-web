import { useState } from "react";
import * as Y from "yjs";

export const useSharedWorkspaceText = () => {
    // TODO: change useState to zustand store with a Y.Doc
    const [sharedWorkspaceText, setSharedWorkspaceText] = useState<Y.Doc>();

    return {
        sharedWorkspaceText,
        setSharedWorkspaceText
    }
}