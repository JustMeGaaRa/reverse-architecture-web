import { useWorkspace, WorkspaceProvider } from "@structurizr/react";
import { Workspace } from "@structurizr/y-workspace";
import { CurrentUser, WorkspaceRoom } from "@structurizr/live";
import { useSnackbar } from "@restruct/ui";
import {
    useYjsCollaborative,
    YjsDocumentProvider,
    YjsIndexeddbPersistanceProvider,
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
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import {
    CommentApi,
    createWorkspaceConnection,
    createWorkspacePersistance,
    useAccount,
    useCommentsStore,
    useLoaderState
} from "../../features";
import { WorkspaceCollaborativeEditor } from "./WorkspaceCollaborativeEditor";
import { WorkspacePageActions } from "./WorkspacePageActions";
import { WorkspaceSession } from "./WorkspaceSession";
import { useWorkspaceNavigation, WorkspaceNavigationProvider } from "@restruct/workspace-renderer";

export const WorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { account } = useAccount();
    
    const [ roomId, setRoomId ] = useState<string>();
    const [ roomPassword, setRoomPassword ] = useState<string>();

    const handleOnSessionStarted = useCallback((roomId: string, roomPassword: string) => {
        setRoomId(roomId);
        setRoomPassword(roomPassword);
    }, []);

    // NOTE: a user that owns the workspace file opens this page.
    // First, the workspace file needs to be loaded and the WebRTC provider should be listening for connections.
    // Secondly, the workspace session with room credentials needs to be created for other users to be able to join.
    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsIndexeddbPersistanceProvider>
                <YjsWebrtcProviderProvider>
                    <YjsUndoManagerProvider>
                        
                        <WorkspaceIndexeddbLoader workspaceId={workspaceId}>
                            <WorkspaceSession workspaceId={workspaceId} onSessionStarted={handleOnSessionStarted}>
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
                        </WorkspaceIndexeddbLoader>
            
                    </YjsUndoManagerProvider>
                </YjsWebrtcProviderProvider>
            </YjsIndexeddbPersistanceProvider>
        </YjsDocumentProvider>
    )
}

export const WorkspaceIndexeddbLoader: FC<PropsWithChildren<{ workspaceId: string }>> = ({ children, workspaceId }) => {
    const { document, setPersistance } = useYjsCollaborative();
    const [ isLoading, , onStopLoading ] = useLoaderState({ isLoading: true });

    useEffect(() => {
        if (workspaceId && document) {
            const [persistance] = createWorkspacePersistance(workspaceId, document);

            persistance.whenSynced.then(persistance => {
                setPersistance(persistance);
                onStopLoading();
            });

            return () => {
                persistance.destroy();
            }
        }
    }, [document, onStopLoading, setPersistance, workspaceId]);

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

export const WorkspaceWebrtcConnector: FC<PropsWithChildren<{ workspaceId: string }>> = ({ children, workspaceId }) => {
    const { document, setConnection } = useYjsCollaborative();
    const [ isLoading, , onStopLoading ] = useLoaderState({ isLoading: true });

    useEffect(() => {
        if (workspaceId) {
            const [connection] = createWorkspaceConnection(workspaceId, document);

            setConnection(connection);
            onStopLoading();

            return () => {
                connection.destroy();
            }
        }
    }, [document, onStopLoading, setConnection, workspaceId]);

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

export const WorkspaceInitializer: FC<PropsWithChildren> = ({ children }) => {
    const { document, setUndoManager } = useYjsCollaborative();
    const { setWorkspace } = useWorkspace();
    const { setCurrentView } = useWorkspaceNavigation();
    
    useEffect(() => {
        if (document) {
            const modelMap = document.getMap("model");
            const viewsMap = document.getMap("views");
            const propertiesMap = document.getMap("properties");
            const undoManager = new Y.UndoManager([modelMap, viewsMap, propertiesMap]);
            const workspace = new Workspace(document);
            const workspaceSnapshot = workspace.toSnapshot();

            setUndoManager(undoManager);
            setWorkspace(workspaceSnapshot);
            setCurrentView(workspaceSnapshot.views.systemLandscape);
        }
    }, [document, setCurrentView, setUndoManager, setWorkspace]);

    return (
        <>
            {children}
        </>
    )
}

export const WorkspaceCommentsLoader: FC<{ workspaceId: string }> = ({ workspaceId }) => {
    const { snackbar } = useSnackbar();
    const { setCommentThreads } = useCommentsStore();
    const [ isLoading, onStartLoading, onStopLoading ] = useLoaderState();

    useEffect(() => {
        const commentApi = new CommentApi();
        const controller = new AbortController();

        onStartLoading();
        
        commentApi.getDiscussions(workspaceId)
            .then(comments => {
                onStopLoading();
                setCommentThreads(comments);
            })
            .catch(error => {
                onStopLoading();
                snackbar({
                    title: "Error loading comments",
                    description: error.message,
                    status: "error"
                })
            });
        
        return () => {
            setCommentThreads([]);
        }
    }, [workspaceId, setCommentThreads, snackbar, onStartLoading, onStopLoading]);

    return null;
}