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
    IWorkspace,
    IWorkspaceMetadata,
} from "@structurizr/dsl";
import { Panel } from "@workspace/core";
import { WorkspaceDiagramming } from "@workspace/diagramming";
import {
    BookmarkEmpty,
    ChatLines,
    InfoEmpty,
    ShareAndroid,
    ThumbsUp,
} from "iconoir-react";
import { FC, useState } from "react";
import {
    CommentThread,
    WorkspaceInfo,
    TemplateSectionInfo,
    useAccount,
    TemplateSectionDiscussion
} from "../..";
import {
    ContextLevelProvider,
    ContextSheet,
    ContextSheetCloseButton,
    ContextSheetPanel
} from "@reversearchitecture/ui";
import { WorkspaceNavigation } from "@workspace/navigation";
import { TemplateHeader } from "./TemplateHeader";

export const TemplateOverview: FC<{
    information: WorkspaceInfo;
    workspace: IWorkspace;
    metadata: IWorkspaceMetadata;
    discussion: CommentThread;
    onTryItClick?: () => void;
    onFollowClick?: () => void;
    onClose?: () => void;
}> = ({
    information,
    workspace,
    metadata,
    discussion,
    onTryItClick,
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
                        <ContextSheetPanel padding={2} gap={2}>
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
                                            <TemplateHeader
                                                name={information?.name}
                                                createdBy={information?.createdBy}
                                                usedCount={788}
                                                likedCount={47}
                                                onTryItClick={onTryItClick}
                                            />
                                        </Panel>
                                        <Panel position={"top-left"} spacing={2}>
                                            <WorkspaceNavigation />
                                        </Panel>
                                    </WorkspaceDiagramming>
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
                                                onComment={(text) => {}}
                                            />
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
                                isActive={tabIndex === 1}
                                onClick={() => setTabIndex(1)}
                            />
                            <IconButton
                                aria-label={"bookmark"}
                                icon={<Icon as={BookmarkEmpty} boxSize={6} />}
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
                </ContextSheetPanel>
            </ContextSheet>
        </ContextLevelProvider>
    )
}