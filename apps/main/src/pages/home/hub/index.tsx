import {
    Box,
    Button,
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
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    Compass,
    FireFlame,
    Folder,
    SunLight
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import {
    NavigationSource,
    PublishWorkspaceModal,
    WorkspaceCardView,
} from "../../../containers";
import { WorkspaceInfo } from "../../../model";
import { CommunityHubApi } from "../../../services";

export const CommunityHub: FC<PropsWithChildren> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ communityApi ] = useState(new CommunityHubApi());
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);
    const [ filters, setFilters ] = useState([]);
    const [ selectedFilter, setSelectedFilter ] = useState("Explore");
    const defaultFilters = [
        { tag: "Explore", icon: Compass },
        { tag: "New", icon: SunLight },
        { tag: "Popular", icon: FireFlame }
    ];
    const navigate = useNavigate();

    const filtered = workspaces.filter(x => x.tags.includes(selectedFilter) || selectedFilter === "Explore");

    useEffect(() => {
        communityApi.getWorkspaces()
            .then(workspaces => {
                setWorkspaces(workspaces);
                setFilters(Array.from(new Set(workspaces.flatMap(x => x.tags))));
            })
            .catch(error => {
                console.error(error);
            });
    }, [communityApi]);

    const onFilterClick = useCallback((filter) => {
        setSelectedFilter(filter);
    }, []);

    const onWorkspaceClick = useCallback((workspace) => {
        navigate(`/workspace/${workspace.workspaceId}`);
    }, [navigate]);

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <ContextSheet>
            <NavigationSource>
                <Button
                    aria-label={"publish workspace"}
                    key={"publish-workspace"}
                    colorScheme={"yellow"}
                    leftIcon={<AddPageAlt />}
                    onClick={onOpen}
                >
                    Publish Workspace
                </Button>
            </NavigationSource>

            <PublishWorkspaceModal
                workspaces={workspaces}
                isOpen={isOpen}
                onClose={onClose}
                onPublish={() => {}}
            />

            <ContextSheetHeader title={"Community Hub"} />
            <Divider />
            <ContextSheetContent padding={0}>
                <Box padding={6} height={"100%"} overflowY={"scroll"}>
                    <HStack overflowX={"hidden"} divider={<StackDivider />} gap={2}>
                        <HStack>
                            {defaultFilters.map((filter) => (
                                <Tag
                                    key={filter.tag}
                                    className={selectedFilter === filter.tag ? "active" : ""}
                                    cursor={"pointer"}
                                    size={"md"}
                                    onClick={() => onFilterClick(filter.tag)}
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
                                    onClick={() => onFilterClick(tag)}
                                >
                                    {capitalize(tag)}
                                </Tag>
                            ))}
                        </HStack>
                    </HStack>
                    <Divider height={16} border={0} />
                    {workspaces.length > 0 && (
                        <WorkspaceCardView
                            workspaces={filtered}
                            onClick={onWorkspaceClick}
                        />
                    )}
                    {workspaces.length === 0 && (
                        <Flex
                            alignItems={"center"}
                            justifyContent={"center"}
                            height={"100%"}
                            width={"100%"}
                        >
                            <EmptyContent
                                icon={Folder}
                                title={"No community workspaces available yet"}
                                description={"To get started, click the \"Create New Project\" button to create a new project."}
                            />
                        </Flex>
                    )}
                </Box>
            </ContextSheetContent>
        </ContextSheet>
    );
}