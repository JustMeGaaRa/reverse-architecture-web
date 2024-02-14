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
    useLocale,
    usePageHeader,
    usePageSidebar,
} from "@reversearchitecture/ui";
import {
    PagePlus,
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
    CommunityTemplateExplorer,
    WorkspaceInfo,
    CommunityApi,
    LocaleKeys,
    useWorkspaceCollection,
} from "../../../features";
import {
    CommunityTemplateModal,
    HomePageLayoutContent,
} from "../";

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

export const CommunityExplorerPage: FC<PropsWithChildren> = () => {
    const navigate = useNavigate();
    const { getLocalizedString } = useLocale();
    const { setShowSidebarButton } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    const [ queryParams, setQueryParam ] = useSearchParams();
    const { clone } = useWorkspaceCollection();
    
    const communityApi = useMemo(() => new CommunityApi(), []);
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
                        leftIcon={<Icon as={PagePlus} boxSize={5} />}
                        iconSpacing={"0px"}
                    >
                        <Text marginX={2}>Publish to Community</Text>
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent]);

    useEffect(() => {
        communityApi.getWorkspaces()
            .then(workspaces => {
                setWorkspaces(workspaces);
            })
            .catch(error => {
                console.error(error);
            });

        communityApi.getFilterTags()
            .then(tags => {
                setFilterTags(tags);
            })
            .catch(error => {
                console.error(error);
            });
    }, [communityApi, setShowSidebarButton]);

    const handleOnClickCategory = useCallback((filter) => {
        setSelectedCategory(filter);
    }, []);

    const handleOnClickFilter = useCallback((tag) => {
        setSelectedTag(selected => selected === tag ? "" : tag);
    }, []);
    
    const handleOnClickWorkspacePreview = useCallback((workspace: WorkspaceInfo) => {
        setQueryParam({ preview: workspace.workspaceId });
    }, [setQueryParam]);

    const handleOnClickWorskapceTryOut = useCallback((workspace: WorkspaceInfo) => {
        clone(workspace);
        navigate(`/workspaces/${workspace.workspaceId}`);
    }, [clone, navigate]);

    const handleOnClickWorkspacePublish = useCallback((workspace: WorkspaceInfo) => {
        throw new Error("Method not implemented.");
    }, []);

    const handleOnClickTemplateModalClose = useCallback(() => {
        setQueryParam({});
    }, [setQueryParam]);

    return (
        <HomePageLayoutContent>
            <ContextSheet>
                <ContextSheetHeader>
                    <ContextSheetTitle title={"Community"} />
                </ContextSheetHeader>

                <Divider />

                <ContextSheetBody>
                    <Flex direction={"column"} height={"100%"}>
                        {/* TODO: move this code to a separatae filters component */}
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
                                                onClick={() => handleOnClickCategory(category)}
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
                                                onClick={() => handleOnClickFilter(tag)}
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
                            <CommunityTemplateExplorer
                                workspaces={filteredWorkspaces}
                                empty={{
                                    title: getLocalizedString(LocaleKeys.NO_COMMUNITY_WORKSPACES_TITLE),
                                    description: getLocalizedString(LocaleKeys.NO_COMMUNITY_WORKSPACES_SUGGESTION)
                                }}
                                error={{
                                    description: getLocalizedString(LocaleKeys.ERROR_LOADING_TEMPLTES)
                                }}
                                onClick={handleOnClickWorkspacePreview}
                                onTryIt={handleOnClickWorskapceTryOut}
                            />

                            <CommunityTemplateModal
                                workspaceId={queryParams.get("preview")}
                                isOpen={!!queryParams.get("preview")}
                                onClose={handleOnClickTemplateModalClose}
                            />
                        </Box>
                    </Flex>
                </ContextSheetBody>
            </ContextSheet>
        </HomePageLayoutContent>
    );
}