import { useWorkspace, WorkspaceProvider } from "@structurizr/react";
import { Workspace } from "@structurizr/y-workspace";
import {
    CurrentUser, useWorkspaceNavigation, WorkspaceNavigationProvider, WorkspaceRoom
} from "@workspace/react";
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
    useEffect
} from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import {
    CommentApi,
    createWorkspaceConnection,
    createWorkspacePersistance,
    useAccount,
    useCommentsStore,
    useSnackbar
} from "../../features";
import { useLoaderState } from "../../hooks";
import {
    WorkspaceCollaborativeEditor,
    WorkspacePageActions
} from "../workspace";

export const WorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { account } = useAccount();

    // TODO: pass roomId and password to the workspace room

    // NOTE: workspace provider on this page should save changes to the persistant layer,
    // as this is the user who shares and owns the workspace file
    return (
        <YjsDocumentProvider guid={workspaceId}>
            <YjsIndexeddbPersistanceProvider>
                <YjsWebrtcProviderProvider>
                    <YjsUndoManagerProvider>
                        
                        <WorkspaceProvider>
                            <WorkspaceIndexeddbLoader workspaceId={workspaceId}>
                                <WorkspaceRoom options={{ roomId: workspaceId }}>
                                    
                                    <CurrentUser info={account} />

                                    <WorkspaceNavigationProvider>
                                        <WorkspacePageActions workspaceId={workspaceId} />            
                                        <WorkspaceCollaborativeEditor />
                                    </WorkspaceNavigationProvider>

                                </WorkspaceRoom>
                            </WorkspaceIndexeddbLoader>
                        </WorkspaceProvider>
            
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