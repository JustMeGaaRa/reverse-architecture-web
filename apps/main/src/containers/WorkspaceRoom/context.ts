import { createContext } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

export const WorkspaceRoomContext = createContext<{
    ydoc?: Y.Doc;
    provider?: WebrtcProvider;
    users?: any[];
    setYDoc?: (ydoc: Y.Doc) => void;
    setProvider?: (provider: WebrtcProvider) => void;
    setUsers?: (users: any[]) => void;
}>({});