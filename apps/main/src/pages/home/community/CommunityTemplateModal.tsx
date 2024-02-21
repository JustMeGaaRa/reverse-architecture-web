import {
    ButtonGroup,
    Divider,
    Flex,
    Icon,
    IconButton,
    Modal,
    ModalContent,
    ModalOverlay,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip
} from "@chakra-ui/react";
import {
    ContextLevelProvider,
    ContextSheet,
    ContextSheetCloseButton,
    ContextSheetTabContent,
    useLoaderState
} from "@reversearchitecture/ui";
import {
    Bookmark,
    ChatLines,
    InfoCircle,
    ShareAndroid,
    ThumbsUp
} from "iconoir-react";
import {
    FC,
    useCallback,
    useEffect,
    useState
} from "react";
import { parseStructurizr, Workspace } from "structurizr";
import { v4 } from "uuid";
import {
    WorkspacePanel,
    WorkspaceViewBreadcrumbs,
    WorkspaceViewer
} from "workspace";
import {
    CommentApi,
    CommentThread,
    CommunityApi,
    TemplateActionBar,
    TemplateOverview,
    TemplateSectionDiscussion,
    TemplateSectionInfo,
    useAccount,
    useSnackbar,
    useWorkspaceCollection,
    WorkspaceInfo
} from "../../../features";

// TODO: come up with a convention or a way to identify the main thread discussion
const discussionThreadId = "workspace-discussion";

const loadTemplate = async (workspaceId: string) => {
    const communityApi = new CommunityApi()
    const information = await communityApi.getWorkspaceById(workspaceId);
    const structurizrText = await communityApi.getWorkspaceContent(workspaceId);
    const metadata = await communityApi.getWorkspaceMetadata(workspaceId)

    const template = parseStructurizr(structurizrText);
    const workspace = template.applyMetadata(metadata);
    return { information, workspace };
}

const loadComments = async (workspaceId: string) => {
    const commentApi = new CommentApi()
    const comments = await commentApi.getBiscussionById(workspaceId, discussionThreadId);
    return comments;
}

export const CommunityTemplateModal: FC<{
    workspaceId: string;
    isOpen: boolean;
    onClose: () => void;
}> = ({
    workspaceId,
    isOpen,
    onClose
}) => {
    const { snackbar } = useSnackbar();
    const { account } = useAccount();
    const { bookmarkedIds, likedIds, bookmark, unbookmark, like, unlike } = useWorkspaceCollection();

    const [ information, setInformation ] = useState<WorkspaceInfo>();
    const [ template, setTemplate ] = useState(Workspace.Empty);
    const [ discussion, setDiscussion ] = useState<CommentThread>(undefined);
    
    const [ tabIndex, setTabIndex ] = useState(0);
    const { isLoading, onStartLoading, onStopLoading } = useLoaderState();

    useEffect(() => {
        onStartLoading();

        loadTemplate(workspaceId)
            .then(({ information, workspace }) => {
                setInformation(information);
                setTemplate(workspace);
                onStopLoading();
            })
            .catch(error => {
                onStopLoading();
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error"
                })
            })

        return () => {
            setInformation(undefined);
            setTemplate(Workspace.Empty);
            setDiscussion(undefined);
        }
    }, [workspaceId, onStartLoading, onStopLoading, snackbar]);

    const handleOnInformationClick = useCallback(() => {
        setTabIndex(0);
        onStartLoading();

        loadTemplate(workspaceId)
            .then(({ information, workspace }) => {
                setInformation(information);
                setTemplate(workspace);
                onStopLoading();
            })
            .catch(error => {
                onStopLoading();
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error"
                })
            })
    }, [workspaceId, onStartLoading, onStopLoading, snackbar]);

    const handleOnCommentsClick = useCallback(() => {
        setTabIndex(1);
        onStartLoading();

        loadComments(workspaceId)
            .then(comments => {
                setDiscussion(comments);
                onStopLoading();
            })
            .catch(error => {
                onStopLoading();
                snackbar({
                    title: error.message,
                    description: error.message,
                    status: "error"
                })
            })
    }, [workspaceId, onStartLoading, onStopLoading, snackbar]);

    const handleOnWorkspaceBookmark = useCallback(() => {
        bookmarkedIds.includes(workspaceId)
            ? unbookmark(workspaceId)
            : bookmark(workspaceId);
    }, [workspaceId, bookmarkedIds, bookmark, unbookmark]);

    const handleOnWorkspaceLike = useCallback(() => {
        likedIds.includes(workspaceId)
            ? unlike(workspaceId)
            : like(workspaceId);
    }, [workspaceId, likedIds, like, unlike]);

    const handleOnWorskapceTryOut = useCallback(() => {

    }, []);

    const handleOnCommentSend = useCallback((comment: string) => {
        if (workspaceId) {
            const commentInfo = {
                commentId: v4(),
                commentThreadId: discussionThreadId,
                author: account.fullname,
                text: comment,
                createdDate: new Date().toDateString(),
            }
            const commentApi = new CommentApi();
            commentApi.saveDiscussionReply(workspaceId, discussionThreadId, commentInfo)
                .then(comments => setDiscussion(comments))
                .catch(error => console.error(error));
        }
    }, [workspaceId, account.fullname]);

    return (        
        <Modal isOpen={isOpen} size={"full"} onClose={onClose}>
            <ModalOverlay backdropFilter={"auto"} backdropBlur={"2px"} />
            <ModalContent
                bottom={0}
                paddingTop={20}
                paddingX={8}
                position={"absolute"}
                height={"100%"}
                width={"100%"}
            >
                <ContextLevelProvider>
                    <ContextSheet outlineRadius={[32, 32, 0, 0]} outlineWidth={[1, 1, 1, 1]}>
                        <ContextSheetTabContent>
                            <ContextSheet outlineRadius={[32, 32, 0, 0]} outlineWidth={[0, 0, 1, 0]}>
                                <ContextSheetTabContent padding={2} gap={2}>
                                    <ContextSheet outlineRadius={[26, 26, 26, 26]} outlineWidth={[0, 0, 0, 0]}>
                                        <Flex
                                            position={"relative"}
                                            borderRadius={"32px"}
                                            height={"100%"}
                                            width={"100%"}
                                            transitionProperty={"all"}
                                            transitionDuration={"0.3s"}
                                            transitionTimingFunction={"ease"}
                                        >
                                            <WorkspaceViewer
                                                workspace={template}
                                                initialView={template.views.systemLandscape}
                                            >
                                                <WorkspaceViewBreadcrumbs /> 
                                                <WorkspacePanel position={"bottom-left"} spacing={2}>
                                                    <TemplateActionBar
                                                        name={information?.name}
                                                        createdBy={information?.createdBy}
                                                        usedCount={information?.statistics?.used ?? 0}
                                                        likedCount={information?.statistics?.liked ?? 0}
                                                        isLoading={isLoading}
                                                        onTryItClick={handleOnWorskapceTryOut}
                                                    />
                                                </WorkspacePanel>
                                            </WorkspaceViewer>
                                        </Flex>
                                    </ContextSheet>
                                    
                                    <Flex direction={"column"} padding={2} gap={4} height={"100%"} width={"480px"}>
                                        <Tabs height={"100%"} width={"100%"} index={tabIndex}>
                                            <TabPanels height={"100%"}>
                                                <TabPanel>
                                                    <TemplateSectionInfo
                                                        isLoading={isLoading}
                                                        title={template.name}
                                                        description={template?.description}
                                                    />
                                                </TabPanel>
                                                <TabPanel>
                                                    <TemplateSectionDiscussion
                                                        isLoading={isLoading}
                                                        comments={discussion?.comments ?? []}
                                                        onComment={handleOnCommentSend}
                                                    />
                                                </TabPanel>
                                            </TabPanels>
                                        </Tabs>
                                    </Flex>
                                </ContextSheetTabContent>
                            </ContextSheet>
                            
                            <Flex direction={"column"} padding={4} height={"100%"} width={"80px"}>
                                <ButtonGroup
                                    colorScheme={"lime"}
                                    orientation={"vertical"}
                                    size={"lg"}
                                    width={"48px"}
                                    variant={"menuitem"}
                                >
                                    <ContextSheetCloseButton
                                        isDisabled={isLoading}
                                        size={"lg"}
                                        onClick={onClose}
                                    />
                                    <Divider alignSelf={"center"} borderColor={"gray.400"} marginY={2} width={"24px"} />
                                    <Tooltip hasArrow label={"Information"} placement={"left"}>
                                        <IconButton
                                            aria-label={"information"}
                                            icon={<Icon as={InfoCircle} boxSize={6} />}
                                            isActive={tabIndex === 0}
                                            onClick={handleOnInformationClick}
                                        />
                                    </Tooltip>
                                    <Tooltip hasArrow label={"Comments"} placement={"left"}>
                                        <IconButton
                                            aria-label={"comments"}
                                            icon={<Icon as={ChatLines} boxSize={6} />}
                                            isActive={tabIndex === 1}
                                            onClick={handleOnCommentsClick}
                                        />
                                    </Tooltip>
                                    <Tooltip hasArrow label={`Bookmarks: ${information?.statistics?.bookmarked ?? 0}`} placement={"left"}>
                                        <IconButton
                                            aria-label={"bookmarks"}
                                            color={bookmarkedIds.includes(information?.workspaceId) ? "lime.600" : "gray.900"}
                                            icon={<Icon as={Bookmark} boxSize={6} />}
                                            variant={"menuitem"}
                                            onClick={handleOnWorkspaceBookmark}
                                        />
                                    </Tooltip>
                                    <Tooltip hasArrow label={`Likes: ${information?.statistics?.liked ?? 0}`} placement={"left"}>
                                        <IconButton
                                            aria-label={"likes"}
                                            color={likedIds.includes(information?.workspaceId) ? "lime.600" : "gray.900"}
                                            icon={<Icon as={ThumbsUp} boxSize={6} />}
                                            variant={"menuitem"}
                                            onClick={handleOnWorkspaceLike}
                                        />
                                    </Tooltip>
                                    <Tooltip hasArrow label={"Share"} placement={"left"}>
                                        <IconButton
                                            aria-label={"share"}
                                            icon={<Icon as={ShareAndroid} boxSize={6} />}
                                            isActive={tabIndex === 4}
                                        />
                                    </Tooltip>
                                </ButtonGroup>
                            </Flex>
                        </ContextSheetTabContent>
                    </ContextSheet>
                </ContextLevelProvider>
            </ModalContent>
        </Modal>
    )
}