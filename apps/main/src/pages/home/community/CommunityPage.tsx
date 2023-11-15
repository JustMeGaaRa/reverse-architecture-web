import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    HStack,
    StackDivider,
    Tag,
    TagLabel,
    TagLeftIcon,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    usePageHeader,
    usePageSidebar,
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    Compass,
    FireFlame,
    SunLight
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import {
    CommunityTemplateList,
    WorkspaceInfo,
    WorkspaceApi
} from "../../../features";
import {
    HomePageLayoutContent,
    WorkspacePublishingModal
} from "../../home";

export const CommunityPage: FC<PropsWithChildren> = () => {
    const { setShowSidebarButton } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const defaultFilters = useMemo(() => {
        return [
            { tag: "Explore", icon: Compass },
            { tag: "New", icon: SunLight },
            { tag: "Popular", icon: FireFlame }
        ];
    }, []);
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);
    const [ filters, setFilters ] = useState([]);
    const [ selectedFilter, setSelectedFilter ] = useState("Explore");
    const navigate = useNavigate();
    const filtered = workspaces.filter(x => x.tags.includes(selectedFilter) || selectedFilter === "Explore");

    useEffect(() => {
        workspaceApi.getWorkspaces()
            .then(workspaces => {
                setWorkspaces(workspaces);
                setFilters(Array.from(new Set(workspaces.flatMap(x => x.tags))));
            })
            .catch(error => {
                console.error(error);
            });
    }, [workspaceApi, setShowSidebarButton]);

    const handleOnFilterClick = useCallback((filter) => {
        setSelectedFilter(filter);
    }, []);

    const handleOnWorkspaceClick = useCallback((workspace: WorkspaceInfo) => {
        navigate(`/community/${workspace.workspaceId}`);
    }, [navigate]);

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleOnWorkspacePublish = useCallback((workspace: WorkspaceInfo) => {
        // workspaceApi.publishWorkspace(workspace);
        // setWorkspaces(workspaces.concat(workspace));
    }, []);

    useEffect(() => {
        setHeaderContent({
            right: (
                <ButtonGroup key={"community-page-actions"} gap={2} mr={4}>
                    <Button
                        aria-label={"publish workspace"}
                        colorScheme={"yellow"}
                        leftIcon={<AddPageAlt />}
                        onClick={onOpen}
                    >
                        Publish Workspace
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent, onOpen]);

    return (
        <HomePageLayoutContent>
            <ContextSheet>
                <WorkspacePublishingModal
                    workspaces={workspaces}
                    isOpen={isOpen}
                    onClose={onClose}
                    onPublish={handleOnWorkspacePublish}
                />

                <ContextSheetHeader>
                    <ContextSheetTitle title={"Community"} />
                </ContextSheetHeader>

                <Divider />

                <ContextSheetBody>
                    <Flex direction={"column"} height={"100%"}>
                        <Box flexBasis={"80px"} flexGrow={0} flexShrink={0} padding={6}>
                            <HStack overflowX={"hidden"} divider={<StackDivider />} gap={2}>
                                <HStack>
                                    {defaultFilters.map((filter) => (
                                        <Tag
                                            key={filter.tag}
                                            className={selectedFilter === filter.tag ? "active" : ""}
                                            cursor={"pointer"}
                                            size={"md"}
                                            onClick={() => handleOnFilterClick(filter.tag)}
                                        >
                                            <TagLeftIcon boxSize={5} as={filter.icon} />
                                            <TagLabel>{filter.tag}</TagLabel>
                                        </Tag>
                                    ))}
                                </HStack>
                                <HStack>
                                    {filters.map((tag) => (
                                        <Tag
                                            key={tag}
                                            className={selectedFilter === tag ? "active" : ""}
                                            cursor={"pointer"}
                                            size={"md"}
                                            onClick={() => handleOnFilterClick(tag)}
                                        >
                                            {capitalize(tag)}
                                        </Tag>
                                    ))}
                                </HStack>
                            </HStack>
                        </Box>
                        <Box flexGrow={1} overflowY={"scroll"} padding={6}>
                            <CommunityTemplateList
                                workspaces={filtered}
                                emptyTitle={"No community workspaces available yet"}
                                emptyDescription={"To get started, click the \"Create New Project\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                            />
                        </Box>
                    </Flex>
                </ContextSheetBody>
            </ContextSheet>
        </HomePageLayoutContent>
    );
}