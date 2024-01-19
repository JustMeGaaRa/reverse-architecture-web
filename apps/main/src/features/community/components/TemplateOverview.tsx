import {
    ButtonGroup,
    Divider,
    Flex,
    Icon,
    IconButton,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import {
    ContextLevelProvider,
    ContextSheet,
    ContextSheetCloseButton,
    ContextSheetTabContent
} from "@reversearchitecture/ui";
import { Workspace } from "structurizr";
import { WorkspaceViewBreadcrumbs, WorkspacePanel, WorkspaceViewer } from "workspace";
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
import { TemplateHeader } from "./TemplateHeader";

export const TemplateOverview: FC<{
    information: WorkspaceInfo;
    workspace: Workspace;
    discussion: CommentThread;
    onInformationClick?: () => void;
    onCommentsClick?: () => void;
    onCommentSend?: (comment: string) => void;
    onTryItClick?: () => void;
    onFollowClick?: () => void;
    onClose?: () => void;
}> = ({
    information,
    workspace,
    discussion,
    onInformationClick,
    onCommentsClick,
    onCommentSend,
    onTryItClick,
    onFollowClick,
    onClose
}) => {
    const [ tabIndex, setTabIndex ] = useState(0);

    const handleOnInformationClick = useCallback(() => {
        setTabIndex(0);
        onInformationClick?.();
    }, [onInformationClick]);

    const handleOnCommentsClick = useCallback(() => {
        setTabIndex(1);
        onCommentsClick?.();
    }, [onCommentsClick]);

    const handleOnCommentSend = useCallback((comment: string) => {
        onCommentSend?.(comment);
    }, [onCommentSend]);

    return (
        <ContextLevelProvider>
            <ContextSheet outlineRadius={[32, 32, 0, 0]} outlineWidth={[1, 1, 1, 1]}>
                <ContextSheetTabContent>
                    <ContextSheet outlineRadius={[32, 32, 0, 0]} outlineWidth={[0, 0, 1, 0]}>
                        <ContextSheetTabContent padding={2} gap={2}>
                            <ContextSheet outlineRadius={[26, 26, 26, 26]} outlineWidth={[0, 0, 0, 0]}>
                                {/* Section: Workspace Preview */}
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
                                        initialView={workspace.views.systemLandscape}
                                    >
                                        <WorkspaceViewBreadcrumbs /> 
                                        <WorkspacePanel position={"bottom-left"} spacing={2}>
                                            <TemplateHeader
                                                name={information?.name}
                                                createdBy={information?.createdBy}
                                                usedCount={788}
                                                likedCount={47}
                                                onTryItClick={onTryItClick}
                                            />
                                        </WorkspacePanel>
                                    </WorkspaceViewer>
                                </Flex>
                            </ContextSheet>

                            {/* Section: Content Information */}
                            <Flex direction={"column"} padding={2} gap={4} height={"100%"} width={"480px"}>
                                <Tabs height={"100%"} width={"100%"} index={tabIndex}>
                                    <TabPanels height={"100%"}>
                                        <TabPanel>
                                            <TemplateSectionInfo
                                                title={workspace.name}
                                                description={workspace?.description}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            <TemplateSectionDiscussion
                                                comments={discussion?.comments ?? []}
                                                onComment={handleOnCommentSend}
                                            />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Flex>
                        </ContextSheetTabContent>
                    </ContextSheet>

                    {/* Section: Navigation */}
                    <Flex direction={"column"} padding={4} height={"100%"} width={"80px"}>
                        <ButtonGroup
                            colorScheme={"lime"}
                            orientation={"vertical"}
                            size={"lg"}
                            width={"48px"}
                            variant={"menuitem"}
                        >
                            <ContextSheetCloseButton
                                size={"lg"}
                                onClick={onClose}
                            />
                            <Divider alignSelf={"center"} borderColor={"gray.400"} width={"24px"} />
                            <IconButton
                                aria-label={"information"}
                                icon={<Icon as={InfoCircle} boxSize={6} />}
                                isActive={tabIndex === 0}
                                onClick={handleOnInformationClick}
                            />
                            <IconButton
                                aria-label={"comments"}
                                icon={<Icon as={ChatLines} boxSize={6} />}
                                isActive={tabIndex === 1}
                                onClick={handleOnCommentsClick}
                            />
                            <IconButton
                                aria-label={"bookmark"}
                                icon={<Icon as={Bookmark} boxSize={6} />}
                                isActive={tabIndex === 2}
                            />
                            <IconButton
                                aria-label={"likes"}
                                icon={<Icon as={ThumbsUp} boxSize={6} />}
                                isActive={tabIndex === 3}
                            />
                            <IconButton
                                aria-label={"share"}
                                icon={<Icon as={ShareAndroid} boxSize={6} />}
                                isActive={tabIndex === 4}
                            />
                        </ButtonGroup>
                    </Flex>
                </ContextSheetTabContent>
            </ContextSheet>
        </ContextLevelProvider>
    )
}