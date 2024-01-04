import { useEffect } from "react";
import { useWorkspaceRoom } from "../hooks";
import { UserInfoRequired } from "../types";

export const useCurrentUserEffect = (userInfo: UserInfoRequired) => {
    const { joinRoom, leaveRoom } = useWorkspaceRoom();
    
    useEffect(() => {
        if (userInfo) { joinRoom(userInfo); }
        return () => { leaveRoom(); }
    }, [userInfo, joinRoom, leaveRoom]);
}