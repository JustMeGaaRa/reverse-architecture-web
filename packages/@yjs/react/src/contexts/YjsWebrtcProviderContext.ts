import { createContext, Dispatch, SetStateAction } from "react";
import { WebrtcProvider } from "y-webrtc";

export const YjsWebrtcProviderContext = createContext<{
    connection: WebrtcProvider;
    setConnection: Dispatch<SetStateAction<WebrtcProvider>>;
}>({
    connection: null,
    setConnection: () => { console.debug("Workspace Collaborative Context: dummy setConnection") },
});