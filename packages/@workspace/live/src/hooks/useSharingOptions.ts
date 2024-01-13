import { useCallback, useContext } from "react"
import { WorkspaceRoomContext } from "../contexts";

export const useSharingOptions = () => {
    const { connectionProvider } = useContext(WorkspaceRoomContext);

    const getSharedLink = useCallback(() => {
        const room = connectionProvider?.roomName;
        const code = connectionProvider?.room.key;
        return `${window.location.origin}/shared?room=${room}&code=${code}`;
    }, [connectionProvider]);

    return {
        getSharedLink
    }
}