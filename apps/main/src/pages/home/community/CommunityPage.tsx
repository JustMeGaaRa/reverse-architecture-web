import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    HStack,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    StackDivider,
    Tag,
    TagLabel,
    Text,
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
    NavArrowDown,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    CommunityTemplateList,
    WorkspaceInfo,
    WorkspaceApi,
} from "../../../features";
import {
    CommunityTemplateModal,
    CommunityPublishingModal,
    HomePageLayoutContent,
} from "../../home";

export const CommunityPage: FC<PropsWithChildren> = () => {
    const { setShowSidebarButton } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const [ queryParams, setQueryParam ] = useSearchParams();
    
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);
    const filterCategories = useMemo(() => {
        return [
            { tag: "Explore", icon: <Compass /> },
            { tag: "New", icon: <SunLight /> },
            { tag: "Popular", icon: <FireFlame /> }
        ];
    }, []);
    const [ selectedCategory, setSelectedCategory ] = useState(filterCategories.at(0));
    const [ filterTags, setFilterTags ] = useState([]);
    const [ selectedTag, setSelectedTag ] = useState("");
    const navigate = useNavigate();
    const filteredWorkspaces = useMemo(() => {
        switch (selectedCategory.tag) {
            case "Explore":
                return workspaces.filter(x => {
                    return x.tags?.includes(selectedTag)
                        || selectedTag === "";
                });
            default:
                return workspaces.filter(x => {
                    return x.tags?.includes(selectedCategory.tag)
                        && x.tags?.includes(selectedTag);
                });
        }
    }, [selectedCategory.tag, selectedTag, workspaces]);

    useEffect(() => {
        setHeaderContent({
            right: (
                <ButtonGroup key={"community-page-actions"} gap={2} mr={4}>
                    <Button
                        aria-label={"publish workspace"}
                        colorScheme={"lime"}
                        leftIcon={<Icon as={AddPageAlt} boxSize={5} />}
                        iconSpacing={"0px"}
                    >
                        <Text marginX={2}>Publish to Community</Text>
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent]);

    useEffect(() => {
        workspaceApi.getWorkspaces()
            .then(workspaces => {
                setWorkspaces(workspaces);
                setFilterTags(Array.from(new Set(workspaces.flatMap(x => x.tags))));
            })
            .catch(error => {
                console.error(error);
            });
    }, [workspaceApi, setShowSidebarButton]);

    const handleOnCategoryClick = useCallback((filter) => {
        setSelectedCategory(filter);
    }, []);

    const handleOnFilterClick = useCallback((tag) => {
        setSelectedTag(selected => selected === tag ? "" : tag);
    }, []);
    
    const handleOnWorkspaceClick = useCallback((workspace: WorkspaceInfo) => {
        setQueryParam({ preview: workspace.workspaceId });
    }, [setQueryParam]);

    const handleOnWorskapceTryOut = useCallback((workspace: WorkspaceInfo) => {
        navigate(`/workspaces/${workspace.workspaceId}`);
    }, [navigate]);
    
    const handleOnWorkspaceBookmark = useCallback((workspace: WorkspaceInfo) => {
        
    }, []);

    const handleOnWorkspaceLike = useCallback((workspace: WorkspaceInfo) => {

    }, []);

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    }

    const handleOnWorkspacePublish = useCallback((workspace: WorkspaceInfo) => {
        // workspaceApi.publishWorkspace(workspace);
        // setWorkspaces(workspaces.concat(workspace));
    }, []);

    return (
        <HomePageLayoutContent>
            <ContextSheet>
                <ContextSheetHeader>
                    <ContextSheetTitle title={"Community"} />
                </ContextSheetHeader>

                <Divider />

                <ContextSheetBody>
                    <Flex direction={"column"} height={"100%"}>
                        <Box flexBasis={"80px"} flexGrow={0} flexShrink={0} padding={6}>
                            <HStack
                                divider={
                                    <StackDivider
                                        borderColor={"gray.400"}
                                        height={"24px"}
                                        alignSelf={"center"}
                                    />
                                }
                                gap={2}
                                overflowX={"hidden"}
                            >
                                <Menu closeOnBlur closeOnSelect>
                                    <MenuButton
                                        as={Button}
                                        leftIcon={selectedCategory.icon}
                                        rightIcon={<NavArrowDown />}
                                        size={"sm"}
                                        textAlign={"left"}
                                        variant={"tonal"}
                                        width={"150px"}
                                    >
                                        {selectedCategory.tag}
                                    </MenuButton>
                                    <MenuList>
                                        {filterCategories.map((category) => (
                                            <MenuItem
                                                key={category.tag}
                                                icon={category.icon}
                                                onClick={() => handleOnCategoryClick(category)}
                                            >
                                                {category.tag}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                {filterTags?.length > 0 && (
                                    <HStack>
                                        {filterTags.map((tag) => (
                                            <Tag
                                                data-group
                                                key={tag}
                                                aria-selected={selectedTag === tag}
                                                onClick={() => handleOnFilterClick(tag)}
                                            >
                                                <TagLabel aria-selected={selectedTag === tag}>
                                                    {capitalize(tag)}
                                                </TagLabel>
                                            </Tag>
                                        ))}
                                    </HStack>
                                )}
                            </HStack>
                        </Box>
                        <Box flexGrow={1} overflowY={"scroll"} padding={6}>
                            <CommunityTemplateList
                                workspaces={filteredWorkspaces}
                                emptyTitle={"No community workspaces available yet"}
                                emptyDescription={"To get started, click the \"New Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                                onTryItClick={handleOnWorskapceTryOut}
                                onBookmarkClick={handleOnWorkspaceBookmark}
                                onLikeClick={handleOnWorkspaceLike}
                            />
                            
                            <CommunityTemplateModal
                                workspaceId={queryParams.get("preview")}
                                isOpen={!!queryParams.get("preview")}
                                onTryItClick={handleOnWorskapceTryOut}
                                onClose={() => setQueryParam({})}
                            />
                        </Box>
                    </Flex>
                </ContextSheetBody>
            </ContextSheet>
        </HomePageLayoutContent>
    );
}