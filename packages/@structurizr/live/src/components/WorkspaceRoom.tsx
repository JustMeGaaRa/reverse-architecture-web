import { useYjsCollaborative } from "@yjs/react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import { WorkspaceRoomContext } from "../contexts";
import { OnlineUserCollection, PresentationOptions, WorkspaceUser } from "../types";

export const WorkspaceRoom: FC<PropsWithChildren<{
    options?: {
        roomId: string;
        password?: string;
    }
}>> = ({
    children,
    options
}) => {
    const { document, setConnection } = useYjsCollaborative();
    const [ isLoading, setIsLoading ] = useState(true);
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
        if (options.roomId) {
            const signaling = { signaling: [ "wss://restruct-webrtc-signaling-7452bb784b0b.herokuapp.com" ] };
            const connection = new WebrtcProvider(options.roomId, document, signaling);

            const onUpdateCollaboratingUsers = () => {
                const collaboratingUsers = new OnlineUserCollection(connection.awareness).getCollaboratingUsers();
                setCollaboratingUsers(collaboratingUsers);
            }

            connection.awareness?.on("change", onUpdateCollaboratingUsers);
            connection.awareness?.on("update", onUpdateCollaboratingUsers);
            
            setConnection(connection);
            setIsLoading(false);

            return () => {
                connection.awareness?.off("change", onUpdateCollaboratingUsers);
                connection.awareness?.off("update", onUpdateCollaboratingUsers);
                connection.destroy();
            }
        }
    }, [document, options.roomId, setConnection]);

    return (
        <WorkspaceRoomContext.Provider
            value={{
                currentUser,
                collaboratingUsers,
                presentation,
                setCurrentUser,
                setPresentationOptions
            }}
        >
            {isLoading ? (<></>) : (children)}
        </WorkspaceRoomContext.Provider>
    )
}