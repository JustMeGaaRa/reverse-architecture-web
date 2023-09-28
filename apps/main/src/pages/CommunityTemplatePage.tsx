import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Highlight,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle
} from "@reversearchitecture/ui";
import {
    useWorkspaceTheme,
    WorkspaceExplorer,
    WorkspaceNavigation,
    WorkspaceZoomControls
} from "@reversearchitecture/workspace-viewer";
import {
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { ArrowTrCircle } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommunityHubApi, WorkspaceInfo } from "../features";

export const CommunityTemplatePage: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ info, setInfo ] = useState<WorkspaceInfo>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();
    const { theme } = useWorkspaceTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const communityApi = new CommunityHubApi();
        communityApi.getWorkspace(workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.text);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), info.theme ?? theme), info.metadata);
                setInfo(info);
                setWorkspace(workspaceObject);
                setMetadata(info.metadata);
            })
            .catch(error => {
                console.error(error);
            })
    }, [workspaceId, theme, parseStructurizr]);

    const handleOnClick = useCallback(() => {
        navigate(`/workspaces/${workspaceId}`);
    }, [navigate, workspaceId]);

    return (
        <ContextSheet>
            <ContextSheetHeader>
                <ContextSheetTitle title={"Community"} />
            </ContextSheetHeader>

            <Divider />

            <ContextSheetBody>
                <Flex
                    direction={"column"}
                    gap={4}
                    alignItems={"center"}
                    justifyContent={"center"}
                    padding={6}
                >
                    <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        width={"600px"}
                    >
                        <Box>
                            <Text color={"whiteAlpha.700"} fontSize={"12px"}>
                                <Highlight query={"Research & Design"} styles={{ color: "yellow.900" }}>
                                    {"Community -> Research & Design"}
                                </Highlight>
                            </Text>
                            <Heading
                                as={"h6"}
                                fontSize={"20px"}
                            >
                                Tailwind React Code Generator
                            </Heading>
                        </Box>
                        <Button
                            colorScheme={"yellow"}
                            leftIcon={<ArrowTrCircle />}
                            title={"try it out"}
                            onClick={handleOnClick}
                        >
                            Try it out
                        </Button>
                    </Flex>
                    <Flex
                        position={"relative"}
                        borderColor={"whiteAlpha.200"}
                        borderRadius={"16px"}
                        borderWidth={1}
                        height={"400px"}
                        width={"1000px"}
                    >
                        <WorkspaceExplorer
                            workspace={workspace}
                            view={workspace.views.systemLandscape}
                            metadata={metadata}
                        >
                            {/* <WorkspaceNavigation />
                            <WorkspaceZoomControls /> */}
                        </WorkspaceExplorer>
                    </Flex>
                    <Flex width={"600px"}>
                        <Tabs width={"100%"}>
                            <TabPanels>
                                <TabPanel>
                                    <Flex
                                        backgroundColor={"whiteAlpha.50"}
                                        borderRadius={"16px"}
                                        padding={4}
                                        width={"100%"}
                                    >
                                        <Avatar
                                            name={info?.createdBy}
                                        />
                                    </Flex>
                                    <Flex>
                                        <Text color={"basic.white"} fontSize={"14px"}>
                                            {info?.description}
                                        </Text>
                                    </Flex>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Flex>
            </ContextSheetBody>
        </ContextSheet>
    )
}