import { useCallback, useContext, useEffect } from "react";
import { Awareness } from "y-protocols/awareness";
import { WorkspaceRoomContext } from "./context";
import { Account } from "./types";

export const useWorkspaceRoomStore = () => {
    return useContext(WorkspaceRoomContext);
}

export const useWorkspaceRoom = () => {
    // users: Account[];   // the list of users in the current room
    // view?: any;         // the current workspace nodes, edges and viewport
    // settings?: any;     // the settings of the current workspace, like shouldFollowPresenter option
    // makePresenter?: () => void;

    const { provider } = useWorkspaceRoomStore();
    
    const joinRoom = useCallback((account: Account) => {
        provider?.awareness.setLocalState({ account });
    }, [provider]);
    
    const leaveRoom = useCallback(() => {
        provider?.awareness.setLocalState({ account: undefined });
    }, [provider]);

    const setMousePosition = useCallback((point: { x: number, y: number }) => {
        provider?.awareness.setLocalStateField("mouse", point);
    }, [provider]);

    return {
        joinRoom,
        leaveRoom,
        setMousePosition,
    }
}

export const useAwarenessEffect = (
    awareness: Awareness,
    handlers: {
        onChange: (awareness: any) => void;
        onUpdate: (awareness: any) => void;
    }
) => {
    const onChange = useCallback(() => {
        handlers.onChange?.(awareness);
    }, [handlers, awareness]);

    const onUpdate = useCallback(() => {
        handlers.onUpdate?.(awareness);
    }, [handlers, awareness]);

    useEffect(() => {
        awareness?.on("change", onChange);
        awareness?.on("update", onUpdate);

        return () => {
            awareness?.off("change", onChange);
            awareness?.off("update", onUpdate);
        }
    }, [awareness, onChange, onUpdate]);
}