import {
    Divider,
    Flex,
    HStack,
    StackDivider,
    Tag,
    TagLabel,
    TagLeftIcon
} from "@chakra-ui/react";
import { CommunityHubApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    WorkspaceCardView,
    WorkspacePreviewCard
} from "@reversearchitecture/ui";
import { Compass, FireFlame, Folder, SunLight } from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";

export const CommunityHub: FC<PropsWithChildren<{

}>> = ({

}) => {
    const [ workspaces, setWorkspaces ] = useState([]);
    const [ filters, setFilters ] = useState([]);
    const [ selectedFilter, setSelectedFilter ] = useState("Explore");
    const navigate = useNavigate();
    const defaultFilters = [
        { tag: "Explore", icon: Compass },
        { tag: "New", icon: SunLight },
        { tag: "Popular", icon: FireFlame }
    ];

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
        console.log(filter);
    }, []);

    const onWorkspaceClick = useCallback((workspace) => {
        navigate(`/workspace/${workspace.workspaceId}`);
    }, [navigate]);

    return (
        <ContextSheet>
            <ContextSheetHeader title={"Community Hub"} />
            <Divider />
            <ContextSheetContent>
                <HStack overflowX={"scroll"} divider={<StackDivider />} gap={2}>
                    <HStack>
                        {defaultFilters.map((filter) => (
                            <Tag
                                key={filter.tag}
                                backgroundColor={"gray.100"}
                                borderWidth={1}
                                borderRadius={16}
                                borderColor={"gray.200"}
                                color={"gray.700"}
                                colorScheme={"gray"}
                                variant={"outline"}
                                cursor={"pointer"}
                                _active={{
                                    backgroundColor: "yellow.100",
                                    borderColor: "yellow.900",
                                    color: "basic.white"
                                }}
                                _hover={{
                                    backgroundColor: "yellow.100",
                                    borderColor: "yellow.900",
                                    color: "basic.white"
                                }}
                                onClick={() => onFilterClick(filter)}
                            >
                                <TagLeftIcon as={filter.icon} />
                                <TagLabel>{filter.tag}</TagLabel>
                            </Tag>
                        ))}
                    </HStack>
                    <HStack>
                        {filters.map((tag) => (
                            <Tag
                                key={tag}
                                backgroundColor={"gray.100"}
                                borderWidth={1}
                                borderRadius={16}
                                borderColor={"gray.200"}
                                color={"gray.700"}
                                colorScheme={"gray"}
                                variant={"outline"}
                                cursor={"pointer"}
                                _active={{
                                    backgroundColor: "yellow.100",
                                    borderColor: "yellow.900",
                                    color: "basic.white"
                                }}
                                _hover={{
                                    backgroundColor: "yellow.100",
                                    borderColor: "yellow.900",
                                    color: "basic.white"
                                }}
                                onClick={() => onFilterClick(tag)}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </HStack>
                </HStack>
                <Divider height={16} border={0} />
                {workspaces.length > 0 ? (
                    <WorkspaceCardView
                        workspaces={workspaces}
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
            </ContextSheetContent>
        </ContextSheet>
    );
}