import { FC, PropsWithChildren, useEffect } from "react";
import { useLoaderState } from "../../features";

export const WorkspaceSession: FC<PropsWithChildren<{
    workspaceId?: string;
    code?: string;
    onSessionStarted?: (roomId: string, roomPassword: string) => void;
    onSessionClosed?: (roomId: string, roomPassword: string) => void;
    onSessionConnected?: (roomId: string, roomPassword: string) => void;
    onSessionDisconnected?: (roomId: string, roomPassword: string) => void;
}>> = ({
    children,
    workspaceId,
    code,
    onSessionStarted,
    onSessionClosed,
    onSessionConnected,
    onSessionDisconnected
}) => {
    const [ isLoading, , onStopLoading ] = useLoaderState({ isLoading: true });

    useEffect(() => {
        // TODO: load the session from the server
        const roomId = workspaceId;
        const roomPassword = undefined;

        onSessionStarted?.(roomId, roomPassword);
        onStopLoading();

        return () => {
            onSessionClosed?.(roomId, roomPassword);
        }
    }, [workspaceId, onSessionClosed, onSessionStarted, onStopLoading]);
    
    useEffect(() => {
        // TODO: load the session from the server
        const roomId = code;
        const roomPassword = undefined;

        onSessionConnected?.(roomId, roomPassword);
        onStopLoading();

        return () => {
            onSessionDisconnected?.(roomId, roomPassword);
        }
    }, [code, onSessionConnected, onSessionDisconnected, onStopLoading]);

    return isLoading
        ? (
            <>
                Loading...
            </>
        ) : (
            <>
                {children}
            </>
        );
}