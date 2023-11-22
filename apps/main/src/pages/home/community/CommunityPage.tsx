import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalContent,
    ModalOverlay,
    StackDivider,
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
    applyMetadata,
    applyTheme,
    Workspace,
    WorkspaceMetadata
} from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { useWorkspaceTheme } from "@workspace/core";
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
import { useNavigate } from "react-router-dom";
import {
    CommunityTemplateList,
    WorkspaceInfo,
    WorkspaceApi,
    TemplateOverview,
    CommentApi,
    CommentThread
} from "../../../features";
import {
    HomePageLayoutContent,
    WorkspacePublishingModal
} from "../../home";

export const CommunityPage: FC<PropsWithChildren> = () => {
    const { setShowSidebarButton } = usePageSidebar();
    const { setHeaderContent } = usePageHeader();
    
    const filterCategories = useMemo(() => {
        return [
            { tag: "Explore", icon: <Compass /> },
            { tag: "New", icon: <SunLight /> },
            { tag: "Popular", icon: <FireFlame /> }
        ];
    }, []);
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);
    const [ filters, setFilters ] = useState([]);
    const [ selectedCategory, setSelectedFilter ] = useState(filterCategories.at(0));
    const navigate = useNavigate();
    const filtered = workspaces.filter(x => x.tags.includes(selectedCategory.tag) || selectedCategory.tag === "Explore");

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

    // workspace
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ info, setInfo ] = useState<WorkspaceInfo>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const { parseStructurizr } = useStructurizrParser();
    const { theme } = useWorkspaceTheme();
    const [ commentThread, setCommentThread ] = useState<CommentThread>();

    const handleOnWorkspaceClick = useCallback((workspace: WorkspaceInfo) => {
        // TODO: open the modal with skeleton first, then load data
        workspaceApi.getWorkspaceById(workspace.workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.content?.text);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), info.content?.theme ?? theme), info.content?.metadata);
                setInfo(info);
                setWorkspace(workspaceObject);
                setMetadata(info.content?.metadata);
                onOpen();
            })
            .catch(error => {
                console.error(error);
            })

        
        // TODO: defer this callback to when the modal is opened
        const api = new CommentApi();
        // api.getCommentThreadById(workspaceId, "comment-thread-1")
        //     .then(comments => setCommentThread(comments))
        //     .catch(error => console.error(error));
        // navigate(`/community/${workspace.workspaceId}`);
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
                        colorScheme={"lime"}
                        leftIcon={<AddPageAlt height={"20px"} width={"20px"} />}
                        // onClick={onOpen}
                    >
                        <Box marginX={2}>Publish to Community</Box>
                    </Button>
                </ButtonGroup>
            )
        })
    }, [setHeaderContent]);

    const handleOnWorskapceTryOut = useCallback((workspaceId: string) => {
        navigate(`/workspaces/${workspaceId}`);
    }, [navigate]);

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
                                overflowX={"hidden"}
                                divider={
                                    <StackDivider
                                        borderColor={"gray.400"}
                                        height={"24px"}
                                        alignSelf={"center"}
                                    />
                                }
                                gap={2}
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
                                        {filterCategories.map((filter) => (
                                            <MenuItem
                                                key={filter.tag}
                                                icon={filter.icon}
                                                onClick={() => handleOnFilterClick(filter)}
                                            >
                                                {filter.tag}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                <ButtonGroup
                                    size={"sm"}
                                    variant={"tonal"}
                                >
                                    {filters.map((tag) => (
                                        <Button
                                            key={tag}
                                            isActive={selectedCategory === tag}
                                            // TODO: handle as a separate selected filter, not a category
                                            // onClick={() => handleOnFilterClick(tag)}
                                        >
                                            {capitalize(tag)}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </HStack>
                        </Box>
                        <Box flexGrow={1} overflowY={"scroll"} padding={6}>
                            <CommunityTemplateList
                                workspaces={filtered}
                                emptyTitle={"No community workspaces available yet"}
                                emptyDescription={"To get started, click the \"New Workspace\" button to create a new project."}
                                onClick={handleOnWorkspaceClick}
                            />
                            
                            <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <Flex
                                        position={"absolute"}
                                        bottom={0}
                                        left={"50%"}
                                        paddingX={8}
                                        paddingTop={20}
                                        height={"100%"}
                                        width={"100%"}
                                        transform={"translateX(-50%)"}
                                    >
                                        <TemplateOverview
                                            information={info}
                                            workspace={workspace}
                                            metadata={metadata}
                                            comments={commentThread}
                                            onTryItOutClick={() => handleOnWorskapceTryOut(info?.workspaceId)}
                                            onClose={onClose}
                                        />
                                    </Flex>
                                </ModalContent>
                            </Modal>
                        </Box>
                    </Flex>
                </ContextSheetBody>
            </ContextSheet>
        </HomePageLayoutContent>
    );
}