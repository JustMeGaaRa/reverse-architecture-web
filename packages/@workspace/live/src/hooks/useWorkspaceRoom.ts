import { UserLocation, WorkspaceUser } from "@workspace/core";
import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";
import { UserInfoRequired } from "../types";

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
        connectionProvider?.awareness.setLocalState({ info: userInfoWithColor });
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