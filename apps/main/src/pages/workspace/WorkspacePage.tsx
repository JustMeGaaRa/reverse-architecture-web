import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useParams } from "react-router-dom";
import {
    Workspace,
    useStructurizrParser,
    IWorkspace,
    StructurizrExportClient
} from "structurizr";
import {
    WorkspaceNavigationProvider,
    CurrentUser,
    WorkspaceRoom,
    WorkspaceProvider,
} from "workspace";
import {
    CommentApi,
    CommentProvider,
    CommentThread,
    useAccount,
    useSnackbar,
    useWorkspaceExplorer,
    WorkspaceApi,
} from "../../features";
import {
    WorkspaceCollaborativeEditor,
} from "../workspace";

export const WorkspacePage: FC = () => {
    console.log("workspace page");
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { account } = useAccount();
    const { snackbar } = useSnackbar();

    const { workspaces } = useWorkspaceExplorer();
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();
    
    const [ discussions, setDiscussions ] = useState<Array<CommentThread>>([]);

    useEffect(() => {
        const loadWorkspaceContent = async (workspaceId: string) => {
            const workspaceApi = new WorkspaceApi();
            const structurizrText = await workspaceApi.getWorkspaceContent(workspaceId);
            const metadata = await workspaceApi.getWorkspaceMetadata(workspaceId);

            const workspace = parseStructurizr(structurizrText);
            const autolayoutWorkspace = workspace.applyMetadata(metadata);

            return autolayoutWorkspace;
        }

        const loadComments = async (workspaceId: string) => {
            const commentApi = new CommentApi();
            const comments = await commentApi.getDiscussions(workspaceId);

            return comments;
        }
        
        loadWorkspaceContent(workspaceId)
            .then(workspace => {
                setWorkspace(workspace);
                // TODO: set code text as well
                // setStructurizrDslText(structurizrText);
            })
            .catch(error => {
                // TODO: load workspace from local storage to support PWA
                const localWorkspace = workspaces.find(workspace => workspace.workspaceId === workspaceId);
                setWorkspace(localWorkspace?.content ?? Workspace.Empty.toObject());
                // TODO: should we show an error loading data if we show local data?
                // snackbar({
                //     title: error.message,
                //     description: error.message,
                //     status: "error",
                //     duration: 9000,
                // })
            })
            
        loadComments(workspaceId)
            .then(comments => {
                setDiscussions(comments);
            })
            .catch(error => {
                // TODO: load comments from local storage to support PWA
                setDiscussions([]);
                // TODO: should we show an error loading data if we show local data?
                // snackbar({
                //     title: error.message,
                //     description: error.message,
                //     status: "error",
                //     duration: 9000,
                // })
            });
        
        return () => {
            setWorkspace(Workspace.Empty);
            setDiscussions([]);
        }
    }, [workspaceId, snackbar, parseStructurizr, setWorkspace, setDiscussions]);

    // NOTE: workspace provider on this page should save changes to the persistant layer,
    // as this is the user who shares and owns the workspace file
    return (
        <WorkspaceProvider initialWorkspace={workspace}>
            <CommentProvider initialDiscussions={discussions}>
                <WorkspaceNavigationProvider initialView={workspace.views.systemLandscape}>
                    <WorkspaceRoom options={{ roomId: workspaceId }}>
                        {/* <CurrentUser info={account} />
                        <WorkspaceCollaborativeEditor /> */}
                    </WorkspaceRoom>
                </WorkspaceNavigationProvider>
            </CommentProvider>
        </WorkspaceProvider>
    )
}