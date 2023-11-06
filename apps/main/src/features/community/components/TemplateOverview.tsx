import {
    Box,
    ButtonGroup,
    Flex,
    IconButton,
    Stack,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {
    IWorkspace,
    IWorkspaceMetadata,
} from "@structurizr/dsl";
import { Panel } from "@workspace/core";
import { WorkspaceScaleToolbar, WorkspaceZoomControls } from "@workspace/controls";
import { WorkspaceDiagramming } from "@workspace/diagramming";
import { WorkspaceNavigation } from "@workspace/navigation";
import {
    BookmarkEmpty,
    ChatLines,
    InfoEmpty,
    ShareAndroid,
    ThumbsUp
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

export const TemplateOverview: FC<{
    information: WorkspaceInfo;
    workspace: IWorkspace;
    metadata: IWorkspaceMetadata;
    comments: CommentThread;
    onTryItOutClick?: () => void;
    onFollowClick?: () => void;
}> = ({
    information,
    workspace,
    metadata,
    comments,
    onTryItOutClick,
    onFollowClick
}) => {
    const [ tabIndex, setTabIndex ] = useState(0);
    // TODO: consider if this should be encapsulated here or passed down as a prop
    const { account } = useAccount();

    // workspace preview
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOnEnlargeClick = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const handleOnReduceClick = useCallback(() => {
        onClose();
    }, [onClose]);

    return (
        <Flex
            direction={"column"}
            gap={4}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Flex
                // backgroundColor={"rgba(45, 47, 48, 0.70)"}
                // backdropFilter={"blur(16px)"}
                justifyContent={"center"}
                paddingTop={4}
                position={"sticky"}
                top={0}
                width={"100%"}
                zIndex={1}
            >
                <Box width={"600px"}>
                    <TemplateHeader
                        information={information}
                        onTryItOutClick={onTryItOutClick}
                    />
                </Box>
            </Flex>
            <Box
                backgroundColor={"blackAlpha.800"}
                backdropFilter={"blur(8px)"}
                position={"fixed"}
                left={0}
                top={0}
                opacity={isOpen ? 1 : 0}
                height={isOpen ? "100vh" : 0}
                width={isOpen ? "100vw" : 0}
                transitionProperty={"opacity"}
                transitionDuration={"0.3s"}
                transitionTimingFunction={"ease"}
            />
            <Flex
                position={"relative"}
                backgroundColor={"whiteAlpha.50"}
                borderColor={"whiteAlpha.300"}
                borderRadius={"16px"}
                borderWidth={1}
                minWidth={"600px"}
                maxWidth={isOpen ? undefined : "1300px"}
                height={isOpen ? "60vh" : "400px"}
                width={isOpen ? "90%" : "80%"}
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
                        <WorkspaceNavigation />
                    </Panel>
                    <Panel position={"bottom-right"} spacing={2}>
                        <WorkspaceZoomControls size={"xs"} />
                        <WorkspaceScaleToolbar
                            size={"xs"}
                            onEnlargeClick={handleOnEnlargeClick}
                            onReduceClick={handleOnReduceClick}
                        />
                    </Panel>
                </WorkspaceDiagramming>
            </Flex>
            <Flex width={"600px"} position={"relative"}>
                <Flex
                    position={"absolute"}
                    paddingX={2}
                    right={0}
                    top={0}
                    transform={"translateX(100%)"}
                >
                    <ButtonGroup
                        colorScheme={"gray"}
                        orientation={"vertical"}
                        size={"sm"}
                        variant={"ghost"}
                    >
                        <IconButton
                            aria-label={"information"}
                            icon={<InfoEmpty />}
                            isActive={tabIndex === 0}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setTabIndex(0)}
                        />
                        <IconButton
                            aria-label={"likes"}
                            icon={<ThumbsUp />}
                            isActive={tabIndex === 1}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setTabIndex(1)}
                        />
                        <IconButton
                            aria-label={"bookmark"}
                            icon={<BookmarkEmpty />}
                            isActive={tabIndex === 2}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setTabIndex(2)}
                        />
                        <IconButton
                            aria-label={"comments"}
                            icon={<ChatLines />}
                            isActive={tabIndex === 3}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setTabIndex(3)}
                        />
                        <IconButton
                            aria-label={"share"}
                            icon={<ShareAndroid />}
                            isActive={tabIndex === 4}
                            _active={{
                                backgroundColor: "whiteAlpha.200",
                                color: "yellow.900"
                            }}
                            onClick={() => setTabIndex(4)}
                        />
                    </ButtonGroup>
                </Flex>
                <Tabs width={"100%"} index={tabIndex}>
                    <TabPanels>
                        <TabPanel>
                            <Stack direction={"column"} spacing={2} width={"100%"}>
                                <Section>
                                    <TemplateSectionCreator
                                        information={information}
                                        onFollowClick={onFollowClick}
                                    />
                                </Section>
                                <Section>
                                    <TemplateSectionDescription
                                        description={workspace?.description}
                                    />
                                </Section>
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <Section>

                            </Section>
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                        <TabPanel>
                            <Stack direction={"column"} spacing={2} width={"100%"}>
                                <Section>
                                    <TemplateSectionCommentInput
                                        author={account?.fullname}
                                        onComment={(text) => {}}
                                    />
                                </Section>
                                <Section>
                                    <Stack direction={"column"} padding={2} spacing={2} width={"100%"}>
                                        {comments?.comments.map((comment, index) => (
                                            <CommentCard key={index} comment={comment} />
                                        ))}
                                    </Stack>
                                </Section>
                            </Stack>
                        </TabPanel>
                        <TabPanel>
                            <Section>

                            </Section>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    )
}