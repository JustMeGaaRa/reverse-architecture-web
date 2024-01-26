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
    ErrorBoundary,
    PageHomeButton,
    ReverseArchitectureSvg,
    Route,
    RouteList,
    useLocale,
    usePageHeader,
    usePageSidebar,
} from "@reversearchitecture/ui";
import {
    AppleShortcuts,
    ChatLines,
    CloudSync,
    Code,
    HelpCircle,
    Settings,
    ViewStructureUp
} from "iconoir-react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    IViewDefinition,
    ViewType,
    useStructurizrParser,
} from "structurizr";
import {
    CollaboratingUserPane,
    Viewport,
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
    LocaleKeys,
    useCommentingMode,
    useCommentsStore,
    useSnackbar,
} from "../../features";
import {
    DiscussionsPane,
    PresenterInfo,
    SharePopover,
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
    const navigate = useNavigate();
    const { getLocalizedString } = useLocale();
    const { setHeaderContent } = usePageHeader();
    const { setSidebarContent, setShowSidebarButton, setSidebarOpen } = usePageSidebar();

    const [ structurizrText, setStructurizrDslText ] = useState("");
    const { parseStructurizr } = useStructurizrParser();
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, openView, setViewport } = useWorkspaceNavigation();

    const { reportViewport, reportMousePosition, reportView } = useUserAwareness();
    const { currentUser, collaboratingUsers } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo } = usePresentationMode();
    const { followUser } = useFollowUserMode();

    const users = useMemo(() => {
        return [currentUser, ...collaboratingUsers].map(user => user.info);
    }, [currentUser, collaboratingUsers]);
    
    const currentViewUsers = useMemo(() => {
        return collaboratingUsers.filter(x => {
            return x.view?.type === currentView?.type
                && x.view?.identifier === currentView?.identifier;
        });
    }, [collaboratingUsers, currentView?.identifier, currentView?.type]);

    const onFollowingUserViewportChange = useCallback((viewport: Viewport) => {
        setViewport(viewport, { duration: 200 });
    }, [setViewport]);

    const onCurrentUserViewChange = useCallback((view: IViewDefinition) => {
        reportView(view ? { type: view.type, identifier: view.identifier } : undefined);
    }, [reportView]);

    useOnUserAwarenessChange({ onChange: reportMousePosition });
    useOnUserViewportChange({ onEnd: reportViewport });
    useOnUserViewChange({ onChange: onCurrentUserViewChange });
    useOnFollowingUserViewportChange({ onChange: onFollowingUserViewportChange });

    // SECTION: sidebar content
    const [ panel, setPanel ] = useState(WorkspaceContentPanel.None);
    const isCodeEditorPanel = panel === WorkspaceContentPanel.Editor;
    const isCommentsPanel = panel === WorkspaceContentPanel.Comments;
    const isVersionHistoryPanel = panel === WorkspaceContentPanel.Versions;

    const handleOnOpenEditor = useCallback(() => {
        setPanel(WorkspaceContentPanel.Editor);
    }, []);

    const handleOnOpenComments = useCallback(() => {
        setPanel(WorkspaceContentPanel.Comments);
    }, []);

    const handleOnOpenVersions = useCallback(() => {
        setPanel(WorkspaceContentPanel.Versions);
    }, []);

    const handleOnClosePanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.None);
    }, []);
    
    useEffect(() => {
        setShowSidebarButton(false);
        setSidebarOpen(false);
        setSidebarContent({
            logo: (
                <PageHomeButton
                    icon={ReverseArchitectureSvg}
                    title={"RE:STRUCT"}
                    onClick={() => navigate("/")}
                />
            ),
            top:(
                <></>
            ),
            middle: (
                <RouteList>
                    <Route
                        icon={<Icon as={Code} boxSize={5} />}
                        isActive={isCodeEditorPanel}
                        title={"Code Editor"}
                        onClick={handleOnOpenEditor}
                    />
                    <Route
                        icon={<Icon as={ChatLines} boxSize={5} />}
                        isActive={isCommentsPanel}
                        title={"Comments"}
                        onClick={handleOnOpenComments}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        isActive={isVersionHistoryPanel}
                        title={"Version History"}
                        onClick={handleOnOpenVersions}
                    />
                </RouteList>
            ),
            bottom: (
                <RouteList>
                    <Route
                        icon={<Icon as={HelpCircle} boxSize={5} />}
                        isDisabled
                        title={"Help & Feedback"}
                        to={"help"}
                    />
                </RouteList>
            )
        })
    }, [
        setSidebarContent,
        setShowSidebarButton,
        setSidebarOpen,
        handleOnOpenComments,
        handleOnOpenEditor,
        handleOnOpenVersions,
        navigate,
        isCodeEditorPanel,
        isCommentsPanel,
        isVersionHistoryPanel
    ]);
    
    // SECTION: header content
    const [ mode, setMode ] = useState(WorkspaceContentMode.Diagramming);
    const isDiagrammingMode = mode === WorkspaceContentMode.Diagramming;
    const isModelingMode = mode === WorkspaceContentMode.Modeling;
    const isDeploymentMode = mode === WorkspaceContentMode.Deployment;

    const handleOnDiagrammingMode = useCallback(() => {
        setMode(WorkspaceContentMode.Diagramming);
        openView(workspace, workspace.views.systemLandscape);
    }, [openView, workspace]);

    const handleOnModelingMode = useCallback(() => {
        setMode(WorkspaceContentMode.Modeling);
        openView(workspace, { type: ViewType.Model, identifier: "" });
    }, [openView, workspace]);

    const handleOnDeploymentMode = useCallback(() => {
        setMode(WorkspaceContentMode.Deployment);
        openView(workspace, workspace.views.deployments?.at(0));
    }, [openView, workspace]);

    const handleOnWorkspaceNameChange = useCallback((value: string) => {
        // renameWorkspace(workspace, value);
    }, []);

    useEffect(() => {
        setHeaderContent({
            left: (
                <HStack key={"workspace-page-title"} gap={2}>
                    <Divider
                        borderWidth={1}
                        color={"whiteAlpha.200"}
                        height={"32px"}
                        orientation={"vertical"}
                    />
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={NavLink} to={"/workspaces"} marginX={2}>
                                <Text textStyle={"b2"} color={"gray.900"} noOfLines={1}>
                                    My Workspaces
                                </Text>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink marginX={2}>
                                <Editable
                                    maxWidth={"300px"}
                                    textStyle={"b2"}
                                    defaultValue={workspace.name}
                                    onBlur={handleOnWorkspaceNameChange}
                                >
                                    <EditablePreview noOfLines={1} />
                                    <EditableInput />
                                </Editable>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <ButtonGroup spacing={1}>
                        <WorkspaceMenu workspace={workspace} title={workspace.name} />
                        <IconButton
                            aria-label={"save"}
                            colorScheme={"gray"}
                            variant={"ghost"}
                            icon={<Icon as={CloudSync} boxSize={5} />}
                            size={"md"}
                        />
                    </ButtonGroup>
                </HStack>
            ),
            middle: (
                <ButtonSegmentedToggle>
                    <Button
                        colorScheme={"lime"}
                        isActive={isDiagrammingMode}
                        paddingInline={6}
                        title={"diagramming"}
                        onClick={handleOnDiagrammingMode}
                    >
                        <Text marginX={1}>Diagramming</Text>
                    </Button>
                    <Button
                        colorScheme={"lime"}
                        isActive={isModelingMode}
                        paddingInline={6}
                        title={"modeling"}
                        onClick={handleOnModelingMode}
                    >
                        <Text marginX={1}>Modeling</Text>
                    </Button>
                    <Button
                        colorScheme={"lime"}
                        isActive={isDeploymentMode}
                        paddingInline={6}
                        title={"deployment"}
                        onClick={handleOnDeploymentMode}
                    >
                        <Text marginX={1}>Deployment</Text>
                    </Button>
                </ButtonSegmentedToggle>
            ),
            right: (
                <HStack gap={2} mr={4}>
                    <UserAvatarGroup
                        users={users}
                        onAvatarClick={followUser}
                    />
                    <Divider
                        borderWidth={1}
                        color={"whiteAlpha.200"}
                        height={"32px"}
                        marginX={2}
                        orientation={"vertical"}
                    />
                    <SharePopover />
                </HStack>
            )
        })
    }, [
        setHeaderContent,
        handleOnDiagrammingMode,
        handleOnModelingMode,
        handleOnDeploymentMode,
        handleOnWorkspaceNameChange,
        followUser,
        workspace,
        users,
        isDiagrammingMode,
        isModelingMode,
        isDeploymentMode
    ]);

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
        if (isCommentingModeEnabled) {
            // TODO: get viewport, translate position and save comment
        }
    }, [isCommentingModeEnabled]);

    // SECTION: code editor panel
    const handleOnStructurizrTextChange = useCallback((value: string) => {
        setStructurizrDslText(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        // TODO: handle parsing errors
        setWorkspace(parseStructurizr(value));
    }, [parseStructurizr, setWorkspace]);

    return (
        <ContextSheet>
            <ContextSheetTabContent>
                {panel === WorkspaceContentPanel.Comments && (
                    <ContextSheetPanel width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"All Discussions"} />
                        </ContextSheetHeader>
                        <Divider />
                        <ContextSheetBody>
                            <CommentThreadList discussions={commentThreads} />
                        </ContextSheetBody>
                    </ContextSheetPanel>
                )}

                {panel === WorkspaceContentPanel.Editor && (
                    <ContextSheetPanel width={"100%"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"Code Editor"} />
                        </ContextSheetHeader>
                        <Divider />
                        <ContextSheetBody>
                            <WorkspaceEditor
                                value={structurizrText}
                                onChange={handleOnStructurizrTextChange}
                            />
                        </ContextSheetBody>
                    </ContextSheetPanel>
                )}

                {panel === WorkspaceContentPanel.Versions && (
                    <ContextSheetPanel width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"Version History"} />
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
                    <ErrorBoundary
                        fallback={(
                            <>{getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES)}</>
                        )}
                    >
                        <WorkspaceViewer
                            workspace={workspace}
                            initialView={currentView}
                            onViewClick={handleOnWorkspaceViewClick}
                        >
                            <CollaboratingUserPane users={currentViewUsers} />
                            <DiscussionsPane discussions={currentViewDiscussions} />
                            <PresenterInfo presenter={presenterInfo} />
                            <WorkspaceViewBreadcrumbs isVisible={isDiagrammingMode} />
                            <WorkspaceUndoRedoControls isVisible={!presentationEnabled} />
                            <WorkspaceActionsToolbar />
                            <WorkspaceZoomControls />
                        </WorkspaceViewer>
                    </ErrorBoundary>
                </ContextSheet>
            </ContextSheetTabContent>
        </ContextSheet>
    );
}