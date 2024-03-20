import { useYjsCollaborative } from "@yjs/react";
import { useCallback } from "react";

export const useSharingOptions = () => {
    const { connection } = useYjsCollaborative();

    const getSharedLink = useCallback(() => {
        const room = connection?.roomName;
        const code = connection?.room.key;
        return `${window.location.origin}/shared?room=${room}&code=${code}`;
    }, [connection]);

    return {
        getSharedLink
    }
}