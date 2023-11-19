import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    IconButton,
    Portal,
    Stack,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from "@chakra-ui/react";
import {
    IWorkspace,
    IWorkspaceMetadata,
} from "@structurizr/dsl";
import { Panel } from "@workspace/core";
import { WorkspaceDiagramming } from "@workspace/diagramming";
import {
    ArrowTrCircle,
    BookmarkEmpty,
    ChatLines,
    Heart,
    InfoEmpty,
    ShareAndroid,
    ThumbsUp,
    UserCircle
} from "iconoir-react";
import { FC, useCallback, useState } from "react";
import {
    CommentCard,
    CommentThread,
    Section,
    WorkspaceInfo,
    TemplateSectionCreator,
    TemplateHeader,
    TemplateSectionDescription,
    useAccount,
    TemplateSectionCommentInput
} from "../..";
import {
    ContextLevelProvider,
    ContextSheet,
    ContextSheetCloseButton,
    ContextSheetHeader,
    ContextSheetPanel,
    ContextSheetTitle
} from "@reversearchitecture/ui";
import { WorkspaceNavigation } from "@workspace/navigation";

export const TemplateOverview: FC<{
    information: WorkspaceInfo;
    workspace: IWorkspace;
    metadata: IWorkspaceMetadata;
    comments: CommentThread;
    onTryItOutClick?: () => void;
    onFollowClick?: () => void;
    onClose?: () => void;
}> = ({
    information,
    workspace,
    metadata,
    comments,
    onTryItOutClick,
    onFollowClick,
    onClose
}) => {
    const [ tabIndex, setTabIndex ] = useState(0);
    // TODO: consider if this should be encapsulated here or passed down as a prop
    const { account } = useAccount();

    return (
        <ContextLevelProvider>
            <ContextSheet>
                <ContextSheetPanel>
                    <ContextSheet>
                        <ContextSheetPanel>
                            <ContextSheet>
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
                                    <WorkspaceDiagramming
                                        workspace={workspace}
                                        view={workspace.views.systemLandscape}
                                        metadata={metadata}
                                    >
                                        <Panel position={"bottom-left"} spacing={2}>
                                            <Box backgroundColor={"gray.100"} borderRadius={16} width={"600px"}>
                                                <Flex padding={2} alignItems={"center"} gap={2}>
                                                    <Avatar
                                                        colorScheme={"purple"}
                                                        name={"Jonathan Joestar"}//{workspace.createdBy}
                                                        size={"lg"}
                                                        title={"Jonathan Joestar"}//{workspace.createdBy}
                                                    />
                                                    <Flex direction={"column"} flexGrow={1} gap={1}>
                                                        <Text color={"basic.white"} lineHeight={"24px"} textStyle={"h6"}>
                                                            {workspace.name}
                                                        </Text>
                                                        <Flex direction={"row"} gap={4} lineHeight={"14px"}>
                                                            <Text color={"whiteAlpha.700"} textStyle={"b5"} alignSelf={"flex-start"}>
                                                                {"Jonathan Joestar"}
                                                            </Text>
                                                            <Tag variant={"unstyled"} height={"14px"} size={"xs"} title={"788 used"}>
                                                                <TagLeftIcon as={UserCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                                                <TagLabel textStyle={"b5"}>788 used</TagLabel>
                                                            </Tag>
                                                            <Tag variant={"unstyled"} height={"14px"} size={"xs"} title={"47 liked"}>
                                                                <TagLeftIcon as={Heart} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                                                <TagLabel textStyle={"b5"}>47 liked</TagLabel>
                                                            </Tag>
                                                        </Flex>
                                                    </Flex>
                                                    <Button
                                                        colorScheme={"lime"}
                                                        leftIcon={<ArrowTrCircle />}
                                                        iconSpacing={0}
                                                        size={"lg"}
                                                        title={"try it out"}
                                                        onClick={onTryItOutClick}
                                                    >
                                                        <Text marginX={2}>Try it out</Text>
                                                    </Button>
                                                </Flex>
                                            </Box>
                                        </Panel>
                                        <Panel position={"top-left"} spacing={2}>
                                            <WorkspaceNavigation />
                                        </Panel>
                                    </WorkspaceDiagramming>
                                </Flex>
                            </ContextSheet>

                            {/* Section: Content Information */}
                            <Flex direction={"column"} padding={4} gap={4} height={"100%"} width={"400px"}>
                                <ContextSheetTitle title={workspace.name} />
                                
                                <Tabs width={"100%"} index={tabIndex}>
                                    <TabPanels>
                                        <TabPanel>
                                            <TemplateSectionDescription
                                                description={workspace?.description}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            <Section>

                                            </Section>
                                        </TabPanel>
                                        <TabPanel>

                                        </TabPanel>
                                        <TabPanel>
                                            <Stack direction={"column"} spacing={2} width={"100%"}>
                                                <TemplateSectionCommentInput onComment={(text) => {}} />
                                                <Stack direction={"column"} padding={2} spacing={2} width={"100%"}>
                                                    {comments?.comments.map((comment, index) => (
                                                        <CommentCard key={index} comment={comment} />
                                                    ))}
                                                </Stack>
                                            </Stack>
                                        </TabPanel>
                                        <TabPanel>
                                            <Section>

                                            </Section>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Flex>
                        </ContextSheetPanel>
                    </ContextSheet>

                    {/* Section: Navigation */}
                    <Flex direction={"column"} padding={4} height={"100%"} width={"80px"}>
                        <ButtonGroup
                            colorScheme={"lime"}
                            orientation={"vertical"}
                            size={"md"}
                            variant={"menuitem"}
                        >
                            <ContextSheetCloseButton onClick={onClose} />
                            <Divider alignSelf={"center"} borderColor={"gray.400"} width={"24px"} />
                            <IconButton
                                aria-label={"information"}
                                icon={<InfoEmpty />}
                                isActive={tabIndex === 0}
                                onClick={() => setTabIndex(0)}
                            />
                            <IconButton
                                aria-label={"likes"}
                                icon={<ThumbsUp />}
                                isActive={tabIndex === 1}
                                onClick={() => setTabIndex(1)}
                            />
                            <IconButton
                                aria-label={"bookmark"}
                                icon={<BookmarkEmpty />}
                                isActive={tabIndex === 2}
                                onClick={() => setTabIndex(2)}
                            />
                            <IconButton
                                aria-label={"comments"}
                                icon={<ChatLines />}
                                isActive={tabIndex === 3}
                                onClick={() => setTabIndex(3)}
                            />
                            <IconButton
                                aria-label={"share"}
                                icon={<ShareAndroid />}
                                isActive={tabIndex === 4}
                                onClick={() => setTabIndex(4)}
                            />
                        </ButtonGroup>
                    </Flex>
                </ContextSheetPanel>
            </ContextSheet>
        </ContextLevelProvider>
    )
}