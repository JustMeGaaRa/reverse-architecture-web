import { FC, PropsWithChildren, createContext, useContext } from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

type ReactFlowSharedState = {
    document?: Y.Doc;
    provider?: WebrtcProvider;
}

const ReactFlowRoomContext = createContext<ReactFlowSharedState | null>(null);

export const ReactFlowRoomProvider: FC<PropsWithChildren<ReactFlowSharedState>> = ({
    children,
    document,
    provider
}) => {
    return (
        <ReactFlowRoomContext.Provider value={{ document, provider }}>
            {children}
        </ReactFlowRoomContext.Provider>
    )
}

export const useReactFlowRoom = () => {
    const context = useContext(ReactFlowRoomContext);
    if (context === undefined || context === null) {
        throw new Error("useReactFlowRoom must be used within a ReactFlowRoomProvider");
    }
    return context;
}