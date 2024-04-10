import { useYjsCollaborative } from "@yjs/react";
import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";
import { UserInfoRequired, WorkspaceUser } from "../types";

export const useWorkspaceRoom = () => {
    const {
        currentUser,
        collaboratingUsers,
        presentation,
        setCurrentUser,
    } = useContext(WorkspaceRoomContext);
    const { connection } = useYjsCollaborative();
    
    const joinRoom = useCallback((userInfo: UserInfoRequired) => {
        const colorSchemes = [
            "gray", "red", "orange", "yellow",
            "lime", "green", "cyan", "blue",
            "purple", "pink"
        ];
        const randomIndex = Math.floor(Math.random() * colorSchemes.length);
        const userInfoWithColor = {
            ...userInfo,
            color: userInfo.color ?? colorSchemes.at(randomIndex)
        }
        const currentUser: WorkspaceUser = { info: userInfoWithColor }
        connection?.awareness.setLocalState({ info: userInfoWithColor });
        setCurrentUser(currentUser);
    }, [connection?.awareness, setCurrentUser]);
    
    const leaveRoom = useCallback(() => {
        connection?.awareness.setLocalState({ info: undefined });
        setCurrentUser(undefined);
    }, [connection?.awareness, setCurrentUser]);

    return {
        currentUser,
        collaboratingUsers,
        presentation,
        joinRoom,
        leaveRoom
    }
}