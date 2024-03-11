import {
    ButtonGroup,
    Divider,
    Flex,
    Icon,
    IconButton,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
} from "@chakra-ui/react";
import {
    ShellProvider,
    Shell,
    ShellCloseButton,
    ShellTabContent
} from "@restruct/ui";
import { Workspace } from "@structurizr/dsl";
import {
    WorkspaceViewBreadcrumbs,
    WorkspacePanel,
    WorkspaceViewer
} from "@workspace/react";
import {
    Bookmark,
    ChatLines,
    InfoCircle,
    ShareAndroid,
    ThumbsUp,
} from "iconoir-react";
import { FC, useCallback, useState } from "react";
import {
    CommentThread,
    WorkspaceInfo,
    TemplateSectionInfo,
    TemplateSectionDiscussion
} from "../../";
import { TemplateActionBar } from "./TemplateActionBar";

export const TemplateOverview: FC<{
    information: WorkspaceInfo;
    comments: CommentThread;
    workspace: Workspace;
    isLoading?: boolean;
    isBookmarked?: boolean,
    isLiked?: boolean,
    onBookmark?: () => void,
    onLike?: () => void,
    onCommentSend?: (comment: string) => void;
    onTryItClick?: () => void;
    onClose?: () => void;
}> = ({
    information,
    workspace,
    comments,
    isLoading,
    isBookmarked,
    isLiked,
    onBookmark,
    onLike,
    onCommentSend,
    onTryItClick,
    onClose
}) => {
    const [ tabIndex, setTabIndex ] = useState(0);

    const handleOnInformationClick = useCallback(() => {
        setTabIndex(0);
    }, []);

    const handleOnCommentsClick = useCallback(() => {
        setTabIndex(1);
    }, []);

    const handleOnCommentSend = useCallback((comment: string) => {
        onCommentSend?.(comment);
    }, [onCommentSend]);

    return (
        <ShellProvider>
            <Shell outlineRadius={[32, 32, 0, 0]} outlineWidth={[1, 1, 1, 1]}>
                <ShellTabContent>
                    <Shell outlineRadius={[32, 32, 0, 0]} outlineWidth={[0, 0, 1, 0]}>
                        <ShellTabContent padding={2} gap={2}>
                            <Shell outlineRadius={[26, 26, 26, 26]} outlineWidth={[0, 0, 0, 0]}>
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
                                        workspace={workspace}
                                        initialView={workspace.views.systemLandscape?.[0]}
                                    >
                                        <WorkspaceViewBreadcrumbs /> 
                                        <WorkspacePanel position={"bottom-left"} spacing={2}>
                                            <TemplateActionBar
                                                name={information?.name}
                                                createdBy={information?.createdBy}
                                                usedCount={information?.statistics?.used ?? 0}
                                                likedCount={information?.statistics?.liked ?? 0}
                                                isLoading={isLoading}
                                                onTryItClick={onTryItClick}
                                            />
                                        </WorkspacePanel>
                                    </WorkspaceViewer>
                                </Flex>
                            </Shell>
                            
                            <Flex direction={"column"} padding={2} gap={4} height={"100%"} width={"480px"}>
                                <Tabs height={"100%"} width={"100%"} index={tabIndex}>
                                    <TabPanels height={"100%"}>
                                        <TabPanel>
                                            <TemplateSectionInfo
                                                isLoading={isLoading}
                                                title={workspace.name}
                                                description={workspace?.description}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            <TemplateSectionDiscussion
                                                isLoading={isLoading}
                                                comments={comments?.comments ?? []}
                                                onComment={handleOnCommentSend}
                                            />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Flex>
                        </ShellTabContent>
                    </Shell>
                    
                    <Flex direction={"column"} padding={4} height={"100%"} width={"80px"}>
                        <ButtonGroup
                            colorScheme={"lime"}
                            orientation={"vertical"}
                            size={"lg"}
                            width={"48px"}
                            variant={"menuitem"}
                        >
                            <ShellCloseButton
                                isDisabled={isLoading}
                                size={"lg"}
                                onClick={onClose}
                            />
                            <Divider alignSelf={"center"} borderColor={"gray.400"} width={"24px"} />
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
                                    color={isBookmarked ? "lime.600" : "gray.900"}
                                    icon={<Icon as={Bookmark} boxSize={6} />}
                                    variant={"menuitem"}
                                    onClick={onBookmark}
                                />
                            </Tooltip>
                            <Tooltip hasArrow label={`Likes: ${information?.statistics?.liked ?? 0}`} placement={"left"}>
                                <IconButton
                                    aria-label={"likes"}
                                    color={isLiked ? "lime.600" : "gray.900"}
                                    icon={<Icon as={ThumbsUp} boxSize={6} />}
                                    variant={"menuitem"}
                                    onClick={onLike}
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
                </ShellTabContent>
            </Shell>
        </ShellProvider>
    )
}