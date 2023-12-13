import { useCallback } from "react";
import { useWorkspaceRoomStore } from "../hooks";
import { User } from "../types";

export const useWorkspaceRoom = () => {
    // users: Account[];   // the list of users in the current room
    // view?: any;         // the current workspace nodes, edges and viewport
    // settings?: any;     // the settings of the current workspace, like shouldFollowPresenter option
    // makePresenter?: () => void;

    const { provider } = useWorkspaceRoomStore();
    
    const joinRoom = useCallback((account: User) => {
        provider?.awareness.setLocalState({ account });
    }, [provider]);
    
    const leaveRoom = useCallback(() => {
        provider?.awareness.setLocalState({ account: undefined });
    }, [provider]);

    const setMousePosition = useCallback((position: { x: number, y: number }) => {
        provider?.awareness.setLocalStateField("position", position);
    }, [provider]);

    return {
        joinRoom,
        leaveRoom,
        setMousePosition,
    }
}