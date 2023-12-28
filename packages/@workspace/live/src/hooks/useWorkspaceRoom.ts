import { UserInfo, UserLocation, WorkspaceUser } from "@workspace/core";
import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";

export const useWorkspaceRoom = () => {
    const {
        workspaceDocument,
        connectionProvider,
        currentUser,
        collaboratingUsers,
        sharingOptions,
        setCurrentUser,
        setSharingOptions
    } = useContext(WorkspaceRoomContext);
    
    const joinRoom = useCallback((userInfo: UserInfo) => {
        const currentUser: WorkspaceUser = { info: userInfo }
        connectionProvider?.awareness.setLocalState({ info: userInfo });
        setCurrentUser(currentUser);
    }, [connectionProvider?.awareness, setCurrentUser]);
    
    const leaveRoom = useCallback(() => {
        connectionProvider?.awareness.setLocalState({ info: undefined });
        setCurrentUser(undefined);
    }, [connectionProvider?.awareness, setCurrentUser]);

    const setUserLocation = useCallback((location: UserLocation) => {
        connectionProvider?.awareness.setLocalStateField("location", location);
        setCurrentUser(user => ({ ...user, location }));
    }, [connectionProvider?.awareness, setCurrentUser]);

    return {
        workspaceDocument,
        connectionProvider,
        currentUser,
        collaboratingUsers,
        sharingOptions,
        joinRoom,
        leaveRoom,
        setUserLocation,
        setSharingOptions
    }
}