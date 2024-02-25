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
import { v4 } from "uuid";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
    IViewDefinition,
    ViewType,
    useStructurizrParser,
    Workspace,
    IWorkspace,
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
    CommentThread,
    CommentThreadList,
    LocaleKeys,
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
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const { getLocalizedString } = useLocale();
    const { setHeaderContent } = usePageHeader();
    const { setSidebarContent, setShowSidebarButton, setSidebarOpen } = usePageSidebar();
    const { snackbar } = useSnackbar();

    const [ structurizrCode, setStructurizrCode ] = useState("");
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

    const handleOnClickEditorPanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.Editor);
    }, []);

    const handleOnClickCommentsPanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.Comments);
    }, []);

    const handleOnClickVersionsPanel = useCallback(() => {
        setPanel(WorkspaceContentPanel.Versions);
    }, []);

    const handleOnClickPanelClose = useCallback(() => {
        setPanel(WorkspaceContentPanel.None);
    }, []);

    const handleOnClickHelp = useCallback(() => {
        throw new Error("Not implemented");
    }, []);
    
    useEffect(() => {
        setShowSidebarButton(false);
        setSidebarOpen(false);
        setSidebarContent({
            top:(
                <></>
            ),
            middle: (
                <RouteList>
                    <Route
                        icon={<Icon as={Code} boxSize={5} />}
                        isActive={isCodeEditorPanel}
                        title={"Code Editor"}
                        onClick={handleOnClickEditorPanel}
                    />
                    <Route
                        icon={<Icon as={ChatLines} boxSize={5} />}
                        isActive={isCommentsPanel}
                        title={"Comments"}
                        onClick={handleOnClickCommentsPanel}
                    />
                    <Route
                        icon={<Icon as={Settings} boxSize={5} />}
                        isActive={isVersionHistoryPanel}
                        title={"Version History"}
                        onClick={handleOnClickVersionsPanel}
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
                        onClick={handleOnClickHelp}
                    />
                </RouteList>
            )
        })
    }, [
        setSidebarContent,
        setShowSidebarButton,
        setSidebarOpen,
        handleOnClickCommentsPanel,
        handleOnClickEditorPanel,
        handleOnClickVersionsPanel,
        handleOnClickHelp,
        isCodeEditorPanel,
        isCommentsPanel,
        isVersionHistoryPanel
    ]);
    
    // SECTION: header content
    const [ mode, setMode ] = useState(WorkspaceContentMode.Diagramming);
    const isDiagrammingMode = mode === WorkspaceContentMode.Diagramming;
    const isModelingMode = mode === WorkspaceContentMode.Modeling;
    const isDeploymentMode = mode === WorkspaceContentMode.Deployment;

    const handleOnClickDiagrammingMode = useCallback(() => {
        setMode(WorkspaceContentMode.Diagramming);
        openView(workspace, workspace.views.systemLandscape);
    }, [openView, workspace]);

    const handleOnClickModelingMode = useCallback(() => {
        setMode(WorkspaceContentMode.Modeling);
        openView(workspace, { type: ViewType.Model, identifier: "" });
    }, [openView, workspace]);

    const handleOnClickDeploymentMode = useCallback(() => {
        setMode(WorkspaceContentMode.Deployment);
        openView(workspace, workspace.views.deployments?.at(0));
    }, [openView, workspace]);

    const handleOnChangeWorkspaceName = useCallback((value: string) => {
        throw new Error("Not implemented");
    }, []);

    // TODO: move auto save to a higher component
    const { workspaces, setWorkspaces } = useWorkspaceExplorer();

    const saveWorkspace = useCallback((workspaceId: string, workspace: Workspace) => {
        // TODO: check if workspace has been modified
        const saveWorkspaceContent = async (workspaceId: string, workspace: Workspace) => {
            // return await workspaceApi.saveWorkspaceContent(workspaceId, workspace);
            return workspace;
        }

        saveWorkspaceContent(workspaceId, workspace)
            .then(workspace => {
                setWorkspaces(workspaces.map(existing => {
                    return existing.workspaceId !== workspaceId
                        ? existing
                        : { ...existing, content: workspace }
                }));
            })
            .catch(error => {
                snackbar({
                    title: "Error saving workspace",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                })
            });
    }, [workspaces, setWorkspaces, snackbar]);

    useEffect(() => {
        const autoSave = setInterval(() => {
            // TODO: check if workspace has been modified
            saveWorkspace(workspaceId, new Workspace(workspace));
        }, 5000);

        return () => {
            clearInterval(autoSave);
        }
    }, [saveWorkspace, workspace, workspaceId]);

    const handleOnClickWorkspaceSave = useCallback(() => {
        saveWorkspace(workspaceId, new Workspace(workspace));
    }, [saveWorkspace, workspaceId, workspace]);

    // TODO: consider moving this to wrapper component
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
                                    onBlur={handleOnChangeWorkspaceName}
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
                            icon={<Icon as={CloudSync} boxSize={5} />}
                            size={"md"}
                            variant={"ghost"}
                            onClick={handleOnClickWorkspaceSave}
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
                        onClick={handleOnClickDiagrammingMode}
                    >
                        <Text marginX={1}>Diagramming</Text>
                    </Button>
                    <Button
                        colorScheme={"lime"}
                        isActive={isModelingMode}
                        paddingInline={6}
                        title={"modeling"}
                        onClick={handleOnClickModelingMode}
                    >
                        <Text marginX={1}>Modeling</Text>
                    </Button>
                    <Button
                        colorScheme={"lime"}
                        isActive={isDeploymentMode}
                        paddingInline={6}
                        title={"deployment"}
                        onClick={handleOnClickDeploymentMode}
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
                    <WorkspaceSharePopover />
                </HStack>
            )
        })
    }, [
        setHeaderContent,
        handleOnClickDiagrammingMode,
        handleOnClickModelingMode,
        handleOnClickDeploymentMode,
        handleOnClickWorkspaceSave,
        handleOnChangeWorkspaceName,
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
        // if (isCommentingModeEnabled) {
        //     // TODO: get viewport, translate position and save comment
        //     const discussion: CommentThread = {
        //         workspaceId: workspaceId,
        //         commentThreadId: v4(),
        //         comments: []
        //     }
        // }
        // throw new Error("Not implemented");
    }, []);

    // SECTION: code editor panel
    const handleOnChangeStructurizrCode = useCallback((value: string) => {
        setStructurizrCode(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        // TODO: handle parsing errors
        setWorkspace(parseStructurizr(value));
    }, [parseStructurizr, setWorkspace]);
    console.log("workspace content editor", workspace)

    return (
        <ContextSheet>
            <ContextSheetTabContent>
                {panel === WorkspaceContentPanel.Comments && (
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

                {panel === WorkspaceContentPanel.Editor && (
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

                {panel === WorkspaceContentPanel.Versions && (
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