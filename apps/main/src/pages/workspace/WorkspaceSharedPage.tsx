import { WorkspaceProvider } from "@structurizr/react";
import {
    CurrentUser,
    WorkspaceNavigationProvider,
    WorkspaceRoom
} from "@workspace/react";
import {
    YjsDocumentProvider,
    YjsUndoManagerProvider,
    YjsWebrtcProviderProvider
} from "@yjs/react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import { useSearchParams } from "react-router-dom";
import { useAccount } from "../../features";
import { useLoaderState } from "../../hooks";
import {
    WorkspaceCollaborativeEditor,
    WorkspaceInitializer,
    WorkspacePageActions
} from "../workspace";

const SharedRoomCodeparam = "code";

export const WorkspaceSharedPage: FC = () => {
    const [ queryParams ] = useSearchParams([[ SharedRoomCodeparam, "" ]]);
    const { account } = useAccount();
    
    const [ roomId, setRoomId ] = useState<string>();
    const [ roomPassword, setRoomPassword ] = useState<string>();

    const handleOnSessionLoaded = useCallback((roomId: string, roomPassword: string) => {
        setRoomId(roomId);
        setRoomPassword(roomPassword);
    }, []);

    // TODO: refactor this component so that the this page shows sync icon, not save button
    
    // NOTE: workspace provider on this page should save changes on tha page only,
    // as this is the page for collaborating users who do not own the workspace file
    return (
        <WorkspaceSessionLoader
            code={queryParams.get(SharedRoomCodeparam)}
            onSessionLoaded={handleOnSessionLoaded}
        >

            <YjsDocumentProvider guid={roomId}>
                <YjsWebrtcProviderProvider>
                    <YjsUndoManagerProvider>

                        <WorkspaceProvider>
                            <WorkspaceRoom options={{ roomId: roomId, password: roomPassword }}>

                                <CurrentUser info={account} />
                                <WorkspaceInitializer />

                                <WorkspaceNavigationProvider>
                                    <WorkspacePageActions workspaceId={roomId} />
                                    <WorkspaceCollaborativeEditor />
                                </WorkspaceNavigationProvider>

                            </WorkspaceRoom>
                        </WorkspaceProvider>
            
                    </YjsUndoManagerProvider>
                </YjsWebrtcProviderProvider>
            </YjsDocumentProvider>

        </WorkspaceSessionLoader>
    )
}

export const WorkspaceSessionLoader: FC<PropsWithChildren<{
    code: string;
    onSessionLoaded?: (roomId: string, roomPassword: string) => void;
}>> = ({
    children,
    code,
    onSessionLoaded
}) => {
    const [ isLoading, , onStopLoading ] = useLoaderState({ isLoading: true });
    
    useEffect(() => {
        // TODO: load the session from the server
        const roomId = code;
        const roomPassword = undefined;

        onSessionLoaded?.(roomId, roomPassword);
        onStopLoading();
    }, [code, onSessionLoaded, onStopLoading]);

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