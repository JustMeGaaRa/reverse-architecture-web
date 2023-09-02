import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    StackDivider,
    Tag,
    TagLabel,
    TagLeftIcon
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    WorkspaceCardView
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
import { useNavigationContext } from "../../../containers";
import { CommunityHubApi } from "../../../services";

export const CommunityHub: FC<PropsWithChildren<{

}>> = ({

}) => {
    const { setAvailableActions } = useNavigationContext();
    const [ workspaces, setWorkspaces ] = useState([]);
    const [ filters, setFilters ] = useState([]);
    const [ selectedFilter, setSelectedFilter ] = useState("Explore");
    const defaultFilters = [
        { tag: "Explore", icon: Compass },
        { tag: "New", icon: SunLight },
        { tag: "Popular", icon: FireFlame }
    ];
    const navigate = useNavigate();

    useEffect(() => {
        setAvailableActions([
            (
                <Button
                    aria-label={"publish workspace"}
                    key={"publish-workspace"}
                    colorScheme={"yellow"}
                    isDisabled={true}
                    leftIcon={<AddPageAlt />}
                >
                    {"Publish Workspace"}
                </Button>
            )
        ])
    }, [setAvailableActions]);

    useEffect(() => {
        const api = new CommunityHubApi();
        api.getWorkspaces()
            .then(workspaces => {
                setWorkspaces(workspaces);
                setFilters(Array.from(new Set(workspaces.flatMap(x => x.tags))));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

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
                    {workspaces.length > 0 ? (
                            <WorkspaceCardView
                                workspaces={workspaces.filter(x => x.tags.includes(selectedFilter) || selectedFilter === "Explore")}
                                onClick={onWorkspaceClick}
                            />
                    ) : (
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