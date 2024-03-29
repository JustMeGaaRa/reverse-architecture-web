import { Divider } from "@chakra-ui/react";
import {
    Shell,
    ShellBody,
    ShellCloseButton,
    ShellHeader,
    ShellPanel,
    ShellTabContent,
    ShellTitle,
} from "@restruct/ui";
import {
    FC,
    useCallback,
    useMemo,
    useState
} from "react";
import { parseStructurizr } from "@structurizr/react";
import {
    CollaboratingUserPane,
    WorkspaceEditor,
    WorkspaceViewBreadcrumbs,
    WorkspaceViewer,
    useOnUserViewportChange,
    useOnUserViewChange,
    useOnUserAwarenessChange,
    useWorkspace,
    useWorkspaceNavigation,
    useWorkspaceRoom,
    usePresentationMode,
    useUserAwareness,
    useOnFollowingUserViewportChange
} from "@workspace/react";
import {
    CommentThreadList,
    useCommentingMode,
    useCommentsStore
} from "../../features";
import {
    DiscussionsPane,
    PresenterInfoBar,
    WorkspaceActionsToolbar,
    WorkspaceUndoRedoControls,
    WorkspaceZoomControls
} from "./";

export enum WorkspaceContentMode {
    Diagramming = "diagramming",
    Modeling = "modeling",
    Deployment = "deployment"
}

export enum WorkspaceContentPanel {
    None = "none",
    Editor = "editor",
    Comments = "comments",
    Versions = "versions"
}

export const WorkspaceCollaborativeEditor: FC = () => {
    console.log("workspace collaborative editor")

    const [ structurizrCode, setStructurizrCode ] = useState("");
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, setViewport } = useWorkspaceNavigation();

    const { reportViewport, reportMousePosition, reportView } = useUserAwareness();
    const { collaboratingUsers } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo } = usePresentationMode();
    
    const currentViewUsers = useMemo(() => {
        return collaboratingUsers.filter(x => {
            return x.view?.type === currentView?.type
                && x.view?.identifier === currentView?.identifier;
        });
    }, [collaboratingUsers, currentView?.identifier, currentView?.type]);

    useOnUserAwarenessChange({ onChange: reportMousePosition });
    useOnUserViewportChange({ onEnd: reportViewport });
    useOnUserViewChange({ onChange: reportView });
    useOnFollowingUserViewportChange({ onChange: setViewport });
    
    // TODO: get selected mode from query params
    const [ mode, setMode ] = useState(WorkspaceContentMode.Diagramming);
    const isDiagrammingMode = mode === WorkspaceContentMode.Diagramming;

    // TODO: get selected panel from query params
    const [ panel, setPanel ] = useState(WorkspaceContentPanel.None);
    const isCodeEditorPanel = panel === WorkspaceContentPanel.Editor;
    const isCommentsPanel = panel === WorkspaceContentPanel.Comments;
    const isVersionHistoryPanel = panel === WorkspaceContentPanel.Versions;

    const handleOnClickPanelClose = useCallback(() => {
        setPanel(WorkspaceContentPanel.None);
    }, []);

    // SECTION: comments panel
    const { isCommentingModeEnabled } = useCommentingMode();
    const { commentThreads } = useCommentsStore();
    const currentViewDiscussions = useMemo(() => {
        return commentThreads.filter(x => {
            return x.metadata?.view?.type === currentView?.type
                && x.metadata?.view?.identifier === currentView?.identifier;
        });
    }, [commentThreads, currentView?.identifier, currentView?.type]);

    const handleOnWorkspaceViewClick = useCallback((event: React.MouseEvent) => {
        // TODO: get viewport, translate position and save comment
        if (isCommentingModeEnabled) {
            throw new Error("Not implemented");
        }
    }, [isCommentingModeEnabled]);

    // SECTION: code editor panel
    const handleOnChangeStructurizrCode = useCallback((value: string) => {
        setStructurizrCode(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        // TODO: handle parsing errors
        setWorkspace(parseStructurizr(value));
    }, [setWorkspace]);

    return (
        <Shell>
            <ShellTabContent>
                {isVersionHistoryPanel && (
                    <ShellPanel width={"400px"}>
                        <ShellHeader>
                            <ShellTitle title={"All Discussions"} />
                            <ShellCloseButton onClick={handleOnClickPanelClose} />
                        </ShellHeader>
                        <Divider />
                        <ShellBody>
                            <CommentThreadList discussions={commentThreads} />
                        </ShellBody>
                    </ShellPanel>
                )}

                {isCodeEditorPanel && (
                    <ShellPanel width={"100%"}>
                        <ShellHeader>
                            <ShellTitle title={"Code Editor"} />
                            <ShellCloseButton onClick={handleOnClickPanelClose} />
                        </ShellHeader>
                        <Divider />
                        <ShellBody>
                            <WorkspaceEditor
                                value={structurizrCode}
                                onChange={handleOnChangeStructurizrCode}
                            />
                        </ShellBody>
                    </ShellPanel>
                )}

                {isCommentsPanel && (
                    <ShellPanel width={"400px"}>
                        <ShellHeader>
                            <ShellTitle title={"Version History"} />
                            <ShellCloseButton onClick={handleOnClickPanelClose} />
                        </ShellHeader>
                        <Divider />
                        <ShellBody>

                        </ShellBody>
                    </ShellPanel>
                )}
                
                <Shell
                    outline={presentationEnabled ? `${presenterInfo?.color}.600` : undefined}
                    outlineWidth={presentationEnabled ? [2, 2, 2, 2] : [2, 2, 0, 0]}
                >
                        <WorkspaceViewer
                            workspace={workspace}
                            initialView={currentView}
                            onViewClick={handleOnWorkspaceViewClick}
                        >
                            <CollaboratingUserPane users={currentViewUsers} />
                            <DiscussionsPane discussions={currentViewDiscussions} />
                            <PresenterInfoBar presenter={presenterInfo} />
                            <WorkspaceViewBreadcrumbs isVisible={isDiagrammingMode} />
                            <WorkspaceUndoRedoControls isVisible={!presentationEnabled} />
                            <WorkspaceActionsToolbar />
                            <WorkspaceZoomControls />
                        </WorkspaceViewer>
                        
                </Shell>
            </ShellTabContent>
        </Shell>
    );
}