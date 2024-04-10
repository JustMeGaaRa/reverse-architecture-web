import { useCallback } from "react";

export const useSharingOptions = () => {
    const getSharedLink = useCallback(() => {
        // TODO: fetch the roomId and code from the server in exchange for the sessionId
        const room = "";
        const code = "";
        return `${window.location.origin}/shared?room=${room}&code=${code}`;
    }, []);

    return {
        getSharedLink
    }
}