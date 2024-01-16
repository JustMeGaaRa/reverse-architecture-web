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
    WorkspaceCacheWrapper,
} from "../../features";
import {
    WorkspaceCollaborativeEditor,
} from "../workspace";

export const WorkspacePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { account } = useAccount();
    const { snackbar } = useSnackbar();
    
    // SECTION: loading workspace from the API
    const workspaceApi = useMemo(() => new WorkspaceCacheWrapper(new WorkspaceApi()), []);
    const { parseStructurizr } = useStructurizrParser();
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());
    // const { openView } = useWorkspaceNavigation();

    useEffect(() => {
        workspaceApi.getWorkspaceById(workspaceId)
            .then(info => {
                const parsedWorkspace = parseStructurizr(info.content?.text);
                const autolayoutWorkspace = parsedWorkspace.applyMetadata(info.content?.metadata);
                setWorkspace(autolayoutWorkspace);
                // openView(autolayoutWorkspace, autolayoutWorkspace.views.systemLandscape);
                // TODO: set code text as well
                // setStructurizrDslText(info.content?.text);
            })
            .catch(error => {
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error",
                    duration: 9000,
                })
            })

        return () => {
            setWorkspace(Workspace.Empty);
        }
    }, [workspaceId, workspaceApi, snackbar, parseStructurizr, setWorkspace]);

    // SECTION: loading comments from the API
    const commentApi = useMemo(() => new CommentApi(), []);
    const [ discussions, setDiscussions ] = useState<Array<CommentThread>>([]);

    useEffect(() => {
        commentApi.getDiscussions(workspaceId)
            .then(comments => {
                setDiscussions(comments);
            })
            .catch(error => {
                console.error(error);
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error",
                    duration: 9000,
                })
            });

        return () => {
            setDiscussions([]);
        }
    }, [workspaceId, commentApi, snackbar, setDiscussions]);
    
    // NOTE: workspace provider on this page should save changes to the persistant layer,
    // as this is the user who shares and owns the workspace file
    return (
        <WorkspaceProvider initialWorkspace={workspace}>
            <CommentProvider initialDiscussions={discussions}>
                <WorkspaceNavigationProvider>
                    <WorkspaceRoom options={{ roomId: workspaceId }}>
                        <CurrentUser info={account} />
                        <WorkspaceCollaborativeEditor />
                    </WorkspaceRoom>
                </WorkspaceNavigationProvider>
            </CommentProvider>
        </WorkspaceProvider>
    )
}