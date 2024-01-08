import { Divider, Flex, HStack, Icon, IconButton } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetTitle,
    usePageHeader,
} from "@reversearchitecture/ui";
import { WorkspaceEditor } from "@workspace/code-editor";
import {
    useOnUserViewportChange,
    useOnUserViewChange,
    useOnUserAwarenessChange,
    UserInfo,
    useWorkspace,
    useWorkspaceNavigation,
    useWorkspaceToolbarStore,
    Viewport,
} from "@workspace/core";
import {
    CollaboratingUserPane,
    useWorkspaceRoom,
    usePresentationMode,
    useUserAwareness,
    useOnFollowingUserViewportChange,
    useFollowUserMode
} from "@workspace/live";
import { WorkspaceViewPath } from "@workspace/navigation";
import { IViewDefinition, ViewType, Workspace } from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    CommentApi,
    CommentThread,
    CommentThreadList,
    useCommentsStore,
} from "../../features";
import {
    DiscussionsPane,
    WorkspaceContentPanel,
    UserAvatarGroup,
    WorkspaceDiagrammingToolbar,
    WorkspaceModelingToolbar,
    WorkspaceUndoRedoControls,
    WorkspaceZoomControls,
    PresenterInfo
} from "./";
import { UserPlus } from "iconoir-react";
import { WorkspaceViewer } from "workspace";
import { PresentationToolbar } from "./PresentationToolbar";

const ViewTypeParam = "type";
const ViewIdParam = "identifier";
const ViewPanelParam = "panel";

export const WorkspaceContentEditor: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ queryParams, setQueryParam ] = useSearchParams([[ ViewTypeParam, ViewType.SystemLandscape ]]);
    const { setHeaderContent } = usePageHeader();

    const [ structurizrDslText, setStructurizrDslText ] = useState("");
    const { parseStructurizr } = useStructurizrParser();
    const { workspace, setWorkspace } = useWorkspace();
    const { currentView, setViewport } = useWorkspaceNavigation();
    const { reportViewport, reportMousePosition, reportView } = useUserAwareness();
    const { currentUser, collaboratingUsers } = useWorkspaceRoom();
    const { presentationEnabled, presenterInfo } = usePresentationMode();
    const { followUser } = useFollowUserMode();
    const { users } = useMemo(() => ({
        users: [currentUser, ...collaboratingUsers].map(user => user.info)
    }), [currentUser, collaboratingUsers]);

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
    
    // set header content
    useEffect(() => {
        setHeaderContent({
            right: (
                <HStack key={"workspace-page-options"} gap={2} mr={4}>
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
                    <IconButton
                        aria-label={"share"}
                        colorScheme={"gray"}
                        icon={<Icon as={UserPlus} boxSize={5} />}
                        isDisabled
                        size={"md"}
                    />
                </HStack>
            )
        })
    }, [setHeaderContent, followUser, users])

    // discussions
    const [ commentThreads, setCommentThreads ] = useState<Array<CommentThread>>([]);
    const { commentApi } = useMemo(() => ({ commentApi: new CommentApi() }), []);
    const { isCommentAddingEnabled } = useWorkspaceToolbarStore();
    const {  } = useCommentsStore();

    useEffect(() => {
        commentApi.getDiscussions(workspaceId)
            .then(comments => setCommentThreads(comments))
            .catch(error => console.error(error));
    }, [workspaceId, commentApi]);

    const handleOnClosePanel = useCallback(() => {
        setQueryParam(params => {
            params.delete("panel");
            return new URLSearchParams(params);
        });
    }, [setQueryParam]);

    // code editor
    const handleOnTextChange = useCallback((value: string) => {
        setStructurizrDslText(value);
        // TODO: use debounce to defer the workspace parsing by 500ms
        setWorkspace(parseStructurizr(value));
    }, [parseStructurizr, setWorkspace]);

    const handleOnWorkspaceChange = useCallback((workspace: Workspace) => {
        // TODO: set structurizr dsl code to a respective provider
        // const structurizrExporter = new StructurizrExportClient();
        // setStructurizrDslText(structurizrText);

        // NOTE: when the workspace is changed internally, we need to save it for further updates
        setWorkspace(workspace);
    }, [setWorkspace]);

    const handleOnWorkspaceViewClick = useCallback((event: React.MouseEvent) => {
        if (isCommentAddingEnabled) {
            // TODO: get viewport, translate position and save comment
        }
    }, [isCommentAddingEnabled]);

    const queryParamersView = useMemo(() => ({
        type: queryParams.get(ViewTypeParam) as ViewType
            ?? ViewType.SystemLandscape,
        identifier: queryParams.get(ViewIdParam)
    }), [queryParams]);

    const isDiagrammingMode = useMemo(() => {
        return queryParams.get(ViewTypeParam) !== ViewType.Model
            && queryParams.get(ViewTypeParam) !== ViewType.Deployment;
    }, [queryParams]);
    const isModelingMode = useMemo(() => {
        return queryParams.get(ViewTypeParam) === ViewType.Model;
    }, [queryParams]);
    const isDeploymentMode = useMemo(() => {
        return queryParams.get(ViewTypeParam) === ViewType.Deployment;
    }, [queryParams]);

    const currentViewUsers = useMemo(() => {
        return collaboratingUsers.filter(x => {
            return x.view?.type === currentView?.type
                && x.view?.identifier === currentView?.identifier;
        });
    }, [collaboratingUsers, currentView?.identifier, currentView?.type]);
    
    const currentViewDiscussions = useMemo(() => {
        return commentThreads.filter(x => {
            return x.metadata?.view?.type === currentView?.type
                && x.metadata?.view?.id === currentView?.identifier;
        });
    }, [commentThreads, currentView?.identifier, currentView?.type]);

    return (
        <ContextSheet>
            <Flex direction={"row"} height={"100%"}>
                {queryParams.get(ViewPanelParam) === WorkspaceContentPanel.Comments && (
                    <Flex direction={"column"} width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"All Discussions"} />
                        </ContextSheetHeader>

                        <Divider />

                        <ContextSheetBody>
                            <CommentThreadList discussions={commentThreads} />
                        </ContextSheetBody>
                    </Flex>
                )}

                {queryParams.get(ViewPanelParam) === WorkspaceContentPanel.Editor && (
                    <Flex direction={"column"} width={"100%"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"Code Editor"} />
                        </ContextSheetHeader>
    
                        <Divider />
                        
                        <ContextSheetBody>
                            <WorkspaceEditor
                                value={structurizrDslText}
                                onChange={handleOnTextChange}
                            />
                        </ContextSheetBody>
                    </Flex>
                )}

                {queryParams.get(ViewPanelParam) === WorkspaceContentPanel.Settings && (
                    <Flex direction={"column"} width={"400px"}>
                        <ContextSheetHeader>
                            <ContextSheetCloseButton onClick={handleOnClosePanel} />
                            <ContextSheetTitle title={"Version History"} />
                        </ContextSheetHeader>
    
                        <Divider />
                        
                        <ContextSheetBody>
                        </ContextSheetBody>
                    </Flex>
                )}
    
                <ContextSheet outline={presentationEnabled ? `${presenterInfo?.color}.600` : undefined}>
                    <WorkspaceViewer
                        workspace={workspace}
                        initialView={queryParamersView}
                        onChange={handleOnWorkspaceChange}
                        onViewClick={handleOnWorkspaceViewClick}
                    >
                        <PresenterInfo presenter={presenterInfo} />
                        <PresentationToolbar isVisible={presentationEnabled} />
                        <CollaboratingUserPane users={currentViewUsers} />
                        <DiscussionsPane discussions={currentViewDiscussions} />
                        <WorkspaceViewPath workspace={workspace} isVisible={isDiagrammingMode} />
                        <WorkspaceUndoRedoControls isVisible={!presentationEnabled} />
                        <WorkspaceDiagrammingToolbar isVisible={!presentationEnabled && isDiagrammingMode} />
                        <WorkspaceModelingToolbar isVisible={!presentationEnabled && isModelingMode} />
                        <WorkspaceZoomControls />
                    </WorkspaceViewer>
                </ContextSheet>
            </Flex>
        </ContextSheet>
    );
}