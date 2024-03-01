import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    ButtonGroup,
    Divider,
    Editable,
    EditableInput,
    EditablePreview,
    HStack,
    Icon,
    IconButton,
    Text,
} from "@chakra-ui/react";
import {
    ButtonSegmentedToggle,
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetPanel,
    ContextSheetTabContent,
    ContextSheetTitle,
    RouteList,
    useLocale,
    usePageHeader,
    usePageSidebar,
} from "@reversearchitecture/ui";
import {
    ChatLines,
    CloudSync,
    Code,
    HelpCircle,
    Settings,
} from "iconoir-react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { NavLink, useParams } from "react-router-dom";
import {
    ViewType,
    useStructurizrParser,
    Workspace,
} from "structurizr";
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
    useOnFollowingUserViewportChange,
    useFollowUserMode
} from "workspace";
import {
    CommentThreadList,
    useCommentingMode,
    useCommentsStore,
    useSnackbar,
    useWorkspaceExplorer,
} from "../../features";
import {
    DiscussionsPane,
    PresenterInfoBar,
    WorkspaceSharePopover,
    UserAvatarGroup,
    WorkspaceActionsToolbar,
    WorkspaceUndoRedoControls,
    WorkspaceZoomControls,
    WorkspaceMenu
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
    const { parseStructurizr } = useStructurizrParser();
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
    }, [parseStructurizr, setWorkspace]);

    return (
        <ContextSheet>
            <ContextSheetTabContent>
                {isVersionHistoryPanel && (
                    <ContextSheetPanel width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetTitle title={"All Discussions"} />
                            <ContextSheetCloseButton onClick={handleOnClickPanelClose} />
                        </ContextSheetHeader>
                        <Divider />
                        <ContextSheetBody>
                            <CommentThreadList discussions={commentThreads} />
                        </ContextSheetBody>
                    </ContextSheetPanel>
                )}

                {isCodeEditorPanel && (
                    <ContextSheetPanel width={"100%"}>
                        <ContextSheetHeader>
                            <ContextSheetTitle title={"Code Editor"} />
                            <ContextSheetCloseButton onClick={handleOnClickPanelClose} />
                        </ContextSheetHeader>
                        <Divider />
                        <ContextSheetBody>
                            <WorkspaceEditor
                                value={structurizrCode}
                                onChange={handleOnChangeStructurizrCode}
                            />
                        </ContextSheetBody>
                    </ContextSheetPanel>
                )}

                {isCommentsPanel && (
                    <ContextSheetPanel width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetTitle title={"Version History"} />
                            <ContextSheetCloseButton onClick={handleOnClickPanelClose} />
                        </ContextSheetHeader>
                        <Divider />
                        <ContextSheetBody>

                        </ContextSheetBody>
                    </ContextSheetPanel>
                )}
                
                <ContextSheet
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
                        
                </ContextSheet>
            </ContextSheetTabContent>
        </ContextSheet>
    );
}