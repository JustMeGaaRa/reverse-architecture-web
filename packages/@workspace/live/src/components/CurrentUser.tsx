import { UserInfo } from "@workspace/core";
import { FC, useEffect } from "react";
import { useWorkspaceRoom } from "../hooks";

export const CurrentUser: FC<{ info: UserInfo }> = ({ info }) => {
    const { joinRoom, leaveRoom } = useWorkspaceRoom();

    useEffect(() => {
        if (info) {
            joinRoom(info);
        }
        
        return () => {
            if (info) {
                leaveRoom();
            }
        }
    }, [info, joinRoom, leaveRoom]);

    return null;
}