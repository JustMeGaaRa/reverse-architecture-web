import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Workspace } from "@structurizr/dsl";
import { parseStructurizr } from "@structurizr/parser";
import {
    WorkspaceNavigationProvider,
    CurrentUser,
    WorkspaceRoom,
    WorkspaceProvider,
    useWorkspace,
    useWorkspaceNavigation,
} from "@workspace/react";
import {
    CommentApi,
    loadWorkspaceContent,
    useAccount,
    useCommentsStore,
    useSnackbar,
    useWorkspaceExplorer,
} from "../../features";
import { useLoaderState } from "../../hooks";
import {
    WorkspaceCollaborativeEditor,
    WorkspacePageActionsWrapper,
} from "../workspace";

export const WorkspacePage: FC = () => {
    console.log("workspace page");
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { account } = useAccount();

    // NOTE: workspace provider on this page should save changes to the persistant layer,
    // as this is the user who shares and owns the workspace file
    return (
        <WorkspaceProvider>
            <WorkspaceNavigationProvider>
                <WorkspaceRoom options={{ roomId: workspaceId }}>
                    <WorkspacePageActionsWrapper workspaceId={workspaceId}>
                        <WorkspaceContentLoader workspaceId={workspaceId} />
                        
                        <CurrentUser info={account} />
                        <WorkspaceCollaborativeEditor />
                    </WorkspacePageActionsWrapper>
                </WorkspaceRoom>
            </WorkspaceNavigationProvider>
        </WorkspaceProvider>
    )
}

export const WorkspaceContentLoader: FC<{
    workspaceId: string;
}> = ({
    workspaceId
}) => {
    console.log("workspace page: content loader")
    const { snackbar } = useSnackbar();
    const { workspaces, setWorkspaces } = useWorkspaceExplorer();
    const { setWorkspace } = useWorkspace();
    const { openView } = useWorkspaceNavigation();

    useEffect(() => {
        // NOTE: load workspace from the server and update the local storage asynchroniously
        loadWorkspaceContent(workspaceId)
            .then(({ structurizr, metadata }) => {
                setWorkspaces(workspaces => workspaces.map(workspace => {
                    return workspace.workspaceId !== workspaceId
                        ? workspace
                        : { ...workspace, content: { structurizr, metadata } }
                }))
            })
            .catch(error => {
                snackbar({
                    title: "Error loading workspace",
                    description: error.message,
                    status: "error"
                })
            })
    }, [workspaceId, setWorkspaces, snackbar]);

    useEffect(() => {
        if (workspaceId) {
            try {
                // NOTE: load workspace from local storage
                // TODO: refactor this code so that when the workspace is saved is does not trigger this effect
                const localWorkspace = workspaces.find(workspace => workspace.workspaceId === workspaceId);
                const parsedWorkspace = new Workspace(parseStructurizr(localWorkspace.content?.structurizr));
                const autolayoutWorkspace = parsedWorkspace.applyMetadata(localWorkspace.content?.metadata);
                setWorkspace(autolayoutWorkspace);
                openView(autolayoutWorkspace, autolayoutWorkspace.views.systemLandscape?.[0])
            }
            catch (error) {
                snackbar({
                    title: "Error parsing workspace",
                    description: error.message,
                    status: "error"
                })
            }
        }
    }, [workspaceId, workspaces, snackbar, setWorkspace, openView]);

    return null;
}

export const WorkspaceCommentsLoader: FC<{
    workspaceId: string;
}> = ({
    workspaceId
}) => {
    console.log("workspace page: comments loader")
    const { snackbar } = useSnackbar();
    const { setCommentThreads } = useCommentsStore();
    const { isLoading, onStartLoading, onStopLoading } = useLoaderState();

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