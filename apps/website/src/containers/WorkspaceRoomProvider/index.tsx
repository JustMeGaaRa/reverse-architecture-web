import { ReactFlowRoomProvider } from "@justmegaara/y-reactflow";
import { ReactFlowProvider } from "@reactflow/core";
import { RoomProvider } from "@y-presence/react";
import { FC, PropsWithChildren } from "react";
import { Doc } from "yjs";
import { WebrtcProvider } from "y-webrtc";

interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
    point: { x: number, y: number };
    color: string;
    isActive: boolean;
}

interface WorkspaceRoom {
    document: Doc;
    provider: WebrtcProvider;
    user: User;
}

type WorkspaceRoomProviderProps = PropsWithChildren<WorkspaceRoom>;

export const WorkspaceRoomProvider: FC<WorkspaceRoomProviderProps> = ({
    children,
    document,
    provider,
    user
}) => {
    return (
        <ReactFlowRoomProvider
            document={document}
            provider={provider}
        >
            <RoomProvider
                awareness={provider.awareness}
                initialPresence={user}
            >
                <ReactFlowProvider>
                    {children}
                </ReactFlowProvider>
            </RoomProvider>
        </ReactFlowRoomProvider>
    );
}