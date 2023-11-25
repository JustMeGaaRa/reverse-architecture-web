import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    Icon,
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
    WorkspaceInfo,
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
            <ContextSheet outlineRadius={[32, 32, 0, 0]} outlineWidth={[1, 1, 1, 1]}>
                <ContextSheetPanel>
                    <ContextSheet outlineRadius={[32, 32, 0, 0]} outlineWidth={[0, 0, 1, 0]}>
                        <ContextSheetPanel padding={2}>
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
                                    <WorkspaceDiagramming
                                        workspace={workspace}
                                        view={workspace.views.systemLandscape}
                                        metadata={metadata}
                                    >
                                        <Panel position={"bottom-left"} spacing={2}>
                                            <Box backgroundColor={"gray.100"} borderRadius={24} width={"600px"}>
                                                <Flex padding={2} alignItems={"center"} gap={2}>
                                                    <Avatar
                                                        colorScheme={"purple"}
                                                        name={information?.createdBy}
                                                        size={"lg"}
                                                        title={information?.createdBy}
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
                            <Flex direction={"column"} padding={4} gap={4} height={"100%"} width={"480px"}>
                                <Tabs width={"100%"} index={tabIndex}>
                                    <TabPanels>
                                        <TabPanel>
                                            <ContextSheetTitle title={workspace.name} />
                                            <TemplateSectionDescription
                                                description={workspace?.description}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            
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
                                icon={<Icon as={InfoEmpty} boxSize={6} />}
                                isActive={tabIndex === 0}
                                onClick={() => setTabIndex(0)}
                            />
                            <IconButton
                                aria-label={"comments"}
                                icon={<Icon as={ChatLines} boxSize={6} />}
                                isActive={tabIndex === 3}
                                onClick={() => setTabIndex(3)}
                            />
                            <IconButton
                                aria-label={"bookmark"}
                                icon={<Icon as={BookmarkEmpty} boxSize={6} />}
                                isActive={tabIndex === 2}
                                onClick={() => setTabIndex(2)}
                            />
                            <IconButton
                                aria-label={"likes"}
                                icon={<Icon as={ThumbsUp} boxSize={6} />}
                                isActive={tabIndex === 1}
                                onClick={() => setTabIndex(1)}
                            />
                            <IconButton
                                aria-label={"share"}
                                icon={<Icon as={ShareAndroid} boxSize={6} />}
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