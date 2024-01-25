import {
    FC,
    useEffect,
    useMemo,
    useState
} from "react";
import { useParams } from "react-router-dom";
import {
    Workspace,
    useStructurizrParser,
    IWorkspace
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
    WorkspaceApi,
} from "../../features";
import {
    WorkspaceCollaborativeEditor,
} from "../workspace";

export const WorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { account } = useAccount();
    const { snackbar } = useSnackbar();

    const workspaceApi = useMemo(() => new WorkspaceApi(), []);
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();

    const commentApi = useMemo(() => new CommentApi(), []);
    const [ discussions, setDiscussions ] = useState<Array<CommentThread>>([]);

    useEffect(() => {
        const loadWorkspace = async (workspaceId: string) => {
            const structurizrText = await workspaceApi.getWorkspaceContent(workspaceId);
            const metadata = await workspaceApi.getWorkspaceMetadata(workspaceId);

            const workspace = parseStructurizr(structurizrText);
            const autolayoutWorkspace = workspace.applyMetadata(metadata);

            setWorkspace(autolayoutWorkspace);
            // TODO: set code text as well
            // setStructurizrDslText(structurizrText);
        }

        const loadComments = async (workspaceId: string) => {
            const comments = await commentApi.getDiscussions(workspaceId);
            setDiscussions(comments);
        }
        
        loadWorkspace(workspaceId)
            .catch(error => {
                // TODO: load workspace from local storage to support PWA
                setWorkspace(Workspace.Empty.toObject());
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error",
                    duration: 9000,
                })
            })
            
        loadComments(workspaceId)
            .catch(error => {
                // TODO: load comments from local storage to support PWA
                setDiscussions([]);
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error",
                    duration: 9000,
                })
            });
        
        return () => {
            setWorkspace(Workspace.Empty);
            setDiscussions([]);
        }
    }, [workspaceId, workspaceApi, commentApi, snackbar, parseStructurizr, setWorkspace, setDiscussions]);

    // NOTE: workspace provider on this page should save changes to the persistant layer,
    // as this is the user who shares and owns the workspace file
    return (
        <WorkspaceProvider initialWorkspace={workspace}>
            <CommentProvider initialDiscussions={discussions}>
                <WorkspaceNavigationProvider initialView={workspace.views.systemLandscape}>
                    <WorkspaceRoom options={{ roomId: workspaceId }}>
                        <CurrentUser info={account} />
                        <WorkspaceCollaborativeEditor />
                    </WorkspaceRoom>
                </WorkspaceNavigationProvider>
            </CommentProvider>
        </WorkspaceProvider>
    )
}