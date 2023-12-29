import { FC, PropsWithChildren, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { WorkspaceRoomContext } from "../contexts";
import { SharingOptions } from "../types";
import { WorkspaceUser } from "@workspace/core";

export const workspaceDocument = new Y.Doc();

export const WorkspaceRoom: FC<PropsWithChildren<{
    roomId: string;
}>> = ({
    children,
    roomId,
}) => {
    const [ connectionProvider, setConnectionProvider ] = useState<WebrtcProvider>();
    const [ currentUser, setCurrentUser ] = useState<WorkspaceUser>({
        info: {
            username: "jonathan.joestar",
            fullname: "Jonathan Joestar",
            color: "green",
        }
    });
    const [ collaboratingUsers, setCollaboratingUsers ] = useState<Array<WorkspaceUser>>([]);
    const [ sharingOptions, setSharingOptions ] = useState<SharingOptions>({ followPresenter: false });

    useEffect(() => {
        let webRtcProvider: WebrtcProvider = new WebrtcProvider(roomId, workspaceDocument);

        const onAwarenessChange = () => {
            const currentUser = webRtcProvider.awareness.getLocalState() as WorkspaceUser;
            const collaboratingUsers = Array
                .from(webRtcProvider.awareness.getStates() ?? [])
                .map(([, value]) => value as WorkspaceUser)
                .filter(user => user.info.username !== currentUser.info.username)
                .filter(user => user !== null && user !== undefined);
            
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
    }, [roomId]);

    return (
        <WorkspaceRoomContext.Provider
            value={{
                workspaceDocument,
                connectionProvider,
                currentUser,
                collaboratingUsers,
                sharingOptions,
                setCurrentUser,
                setSharingOptions
            }}
        >
            {children}
        </WorkspaceRoomContext.Provider>
    )
}