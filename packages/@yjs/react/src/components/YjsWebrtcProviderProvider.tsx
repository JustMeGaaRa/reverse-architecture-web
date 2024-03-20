import { FC, PropsWithChildren, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import { YjsWebrtcProviderContext } from "../contexts";

export const YjsWebrtcProviderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ connection, setConnection ] = useState<WebrtcProvider>();

    return (
        <YjsWebrtcProviderContext.Provider value={{ connection, setConnection }}>
            {children}
        </YjsWebrtcProviderContext.Provider>
    )
}