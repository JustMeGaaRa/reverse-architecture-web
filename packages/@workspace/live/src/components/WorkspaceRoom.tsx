import { useWorkspace, WorkspaceUser } from "@workspace/core";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import { WorkspaceRoomContext } from "../contexts";
import { PresentationOptions } from "../types";

export const WorkspaceRoom: FC<PropsWithChildren<{
    options?: {
        roomId: string;
        password?: string;
    }
}>> = ({
    children,
    options
}) => {
    const { workspaceDocument } = useWorkspace();
    const [ connectionProvider, setConnectionProvider ] = useState<WebrtcProvider>();
    const [ currentUser, setCurrentUser ] = useState<WorkspaceUser>({
        info: {
            username: "jonathan.joestar",
            fullname: "Jonathan Joestar",
            color: "green",
        }
    });
    const [ collaboratingUsers, setCollaboratingUsers ] = useState<Array<WorkspaceUser>>([]);
    const [ presentation, setPresentationOptions ] = useState<PresentationOptions>({
        presentationEnabled: false,
        presenterInfo: undefined,
    });

    useEffect(() => {
        let webRtcProvider: WebrtcProvider = new WebrtcProvider(
            `restruct-room__${options.roomId}`,
            workspaceDocument,
            {
                signaling: [
                    "wss://restruct-webrtc-signaling-7452bb784b0b.herokuapp.com"
                ],
            }
        );

        const onAwarenessChange = () => {
            const collaboratingUsers = Array
                .from(webRtcProvider.awareness.getStates() ?? [])
                .filter(([key, ]) => key !== webRtcProvider.awareness.clientID)
                .map(([, value]) => value as WorkspaceUser)
                .filter(user => user !== null && user !== undefined)
            
            setCollaboratingUsers(collaboratingUsers);
        }

        webRtcProvider.awareness?.on("change", onAwarenessChange);
        webRtcProvider.awareness?.on("update", onAwarenessChange);
        
        setConnectionProvider(webRtcProvider);

        return () => {
            webRtcProvider.awareness?.off("change", onAwarenessChange);
            webRtcProvider.awareness?.off("update", onAwarenessChange);
            webRtcProvider?.disconnect();
            webRtcProvider?.destroy();
        }
    }, [options.roomId, workspaceDocument]);

    return (
        <WorkspaceRoomContext.Provider
            value={{
                workspaceDocument,
                connectionProvider,
                currentUser,
                collaboratingUsers,
                presentation,
                setCurrentUser,
                setPresentationOptions
            }}
        >
            {children}
        </WorkspaceRoomContext.Provider>
    )
}