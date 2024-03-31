import { WorkspaceProvider } from "@structurizr/react";
import { CurrentUser, WorkspaceRoom } from "@workspace/live";
import {
    YjsDocumentProvider,
    YjsUndoManagerProvider,
    YjsWebrtcProviderProvider
} from "@yjs/react";
import { FC, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAccount, WorkspaceNavigationProvider } from "../../features";
import { WorkspaceCollaborativeEditor } from "./WorkspaceCollaborativeEditor";
import { WorkspacePageActions } from "./WorkspacePageActions";
import { WorkspaceSession } from "./WorkspaceSession";

const SharedRoomCodeparam = "code";

export const WorkspaceSharedPage: FC = () => {
    const [ queryParams ] = useSearchParams([[ SharedRoomCodeparam, "" ]]);
    const { account } = useAccount();
    
    const [ roomId, setRoomId ] = useState<string>();
    const [ roomPassword, setRoomPassword ] = useState<string>();

    const handleOnSessionConnected = useCallback((roomId: string, roomPassword: string) => {
        setRoomId(roomId);
        setRoomPassword(roomPassword);
    }, []);
    
    // NOTE: a user the receives the link to the shared workspace and opens this page.
    // First, the workspace session needs to be connected in order to get the shared room credentials.
    // Secondly, the WebRTC provider can establish a connection with the shared room using credentials.
    return (
        <YjsDocumentProvider>
            <YjsWebrtcProviderProvider>
                <YjsUndoManagerProvider>

                    <WorkspaceSession
                        code={queryParams.get(SharedRoomCodeparam)}
                        onSessionConnected={handleOnSessionConnected}
                    >
                        <WorkspaceRoom options={{ roomId: roomId, password: roomPassword }}>

                            <CurrentUser info={account} />

                            <WorkspaceProvider>
                                <WorkspaceNavigationProvider>
                                    <WorkspacePageActions />
                                    <WorkspaceCollaborativeEditor />
                                </WorkspaceNavigationProvider>
                            </WorkspaceProvider>

                        </WorkspaceRoom>
                    </WorkspaceSession>

                </YjsUndoManagerProvider>
            </YjsWebrtcProviderProvider>
        </YjsDocumentProvider>
    )
}