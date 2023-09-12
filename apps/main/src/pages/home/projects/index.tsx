import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    IconButton,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    ScaleFade,
    useDisclosure,
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    Toolbar,
    ToolbarSection
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    BinMinus,
    Cancel,
    Copy,
    Folder,
    List,
    Upload,
    ViewGrid
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import {
    ProjectCardView,
    ProjectTableView,
    ProjectTableProvider,
    NavigationSource,
    CreateProjectModal
} from "../../../containers";
import { ProjectApi } from "../../../services";
import { ContentViewMode, useContentViewMode } from "./hooks";

export const ProjectListContent: FC<PropsWithChildren> = () => {
    const { view, setView } = useContentViewMode(ContentViewMode.Card);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ api ] = useState(new ProjectApi());
    const [ projects, setProjects ] = useState([]);
    const [ selected, setSelected ] = useState<any[]>([]);

    useEffect(() => {
        api.getProjects()
            .then(projects => {
                setProjects(projects);
            })
            .catch(error => {
                console.error(error);
            });
    }, [api]);

    const handleOnRemove = useCallback(() => {
        selected.forEach(item => {
            api.deleteProject(item.projectId);
        });
        api.getProjects()
            .then(projects => {
                setProjects(projects);
            })
            .catch(error => {
                console.error(error);
            });
    }, [api, selected, setProjects]);

    const handleOnClose = useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    return (
        <ContextSheet>
            <NavigationSource>
                <Button
                    aria-label={"create new project"}
                    key={"create-new-project"}
                    colorScheme={"yellow"}
                    leftIcon={<AddPageAlt />}
                    onClick={onOpen}
                >
                    Create New Project
                </Button>
                <IconButton
                    aria-label={"import workspace"}
                    key={"import-workspace"}
                    colorScheme={"gray"}
                    icon={<Upload />}
                    isDisabled={true}
                    title={"Import Workspace"}
                />
            </NavigationSource>

            <CreateProjectModal
                isOpen={isOpen}
                onClose={onClose}
                onCreate={() => {}}
            />

            <ContextSheetHeader title={"All Projects"} />
            <Divider />
            <ContextSheetContent padding={0}>
                <Tabs height={"100%"}>
                    <TabList backgroundColor={"whiteAlpha.50"} px={6} height={12}>
                        <Tab>My projects</Tab>
                        <Tab>Shared</Tab>
                        <Tab>Archived</Tab>
                        
                        <ButtonGroup
                            alignSelf={"center"}
                            colorScheme={"gray"}
                            position={"absolute"}
                            right={4}
                            size={"sm"}
                            variant={"ghost"}
                        >
                            <IconButton
                                aria-label={"card view"}
                                isActive={view === ContentViewMode.Card}
                                icon={<ViewGrid />}
                                onClick={() => setView(ContentViewMode.Card)}
                            />
                            <IconButton
                                aria-label={"table view"}
                                isActive={view === ContentViewMode.Table}
                                icon={<List />}
                                onClick={() => setView(ContentViewMode.Table)}
                            />
                        </ButtonGroup>
                    </TabList>
                    <TabPanels height={"calc(100% - 42px)"}>
                        <TabPanel height={"100%"}>
                            <Box padding={6} height={"100%"} overflowY={"scroll"}>
                                {projects.length === 0 && (
                                    <Flex
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        height={"100%"}
                                        width={"100%"}
                                    >
                                        <EmptyContent
                                            icon={Folder}
                                            title={"No projects"}
                                            description={"To get started, click the \"Create New Project\" button to create a new project."}
                                        />
                                    </Flex>
                                )}
                                {projects.length > 0 && view === ContentViewMode.Card && (
                                    <ProjectCardView
                                        projects={projects}
                                        onRemove={handleOnRemove}
                                    />
                                )}
                                {projects.length > 0 && view === ContentViewMode.Table && (
                                    <ProjectTableProvider>
                                        <ProjectTableView
                                            projects={projects}
                                            onSelected={setSelected}
                                            onRemove={handleOnRemove}
                                        />
                                    </ProjectTableProvider>
                                )}
                            </Box>
                        </TabPanel>
                        <TabPanel height={"100%"}>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                height={"100%"}
                                width={"100%"}
                            >
                                <EmptyContent
                                    icon={Folder}
                                    title={"No shared projects"}
                                    description={"To get started, click the \"Create New Project\" button to create a new project."}
                                />
                            </Flex>
                        </TabPanel>
                        <TabPanel height={"100%"}>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                height={"100%"}
                                width={"100%"}
                            >
                                <EmptyContent
                                    icon={Folder}
                                    title={"No archived projects"}
                                    description={"To get started, click the \"Create New Project\" button to create a new project."}
                                />
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <ScaleFade in={selected.length > 0}>
                    <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
                        <Toolbar>
                            <ToolbarSection>
                                <Text paddingX={2}>
                                    {`${selected.length} item(s) selected`}
                                </Text>
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"copy"}
                                    icon={<Copy />}
                                    isDisabled={true}
                                    title={"copy"}
                                />
                                <IconButton
                                    aria-label={"remove"}
                                    icon={<BinMinus />}
                                    title={"remove"}
                                    onClick={handleOnRemove}
                                />
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"close"}
                                    icon={<Cancel />}
                                    title={"close"}
                                    onClick={handleOnClose}
                                />
                            </ToolbarSection>
                        </Toolbar>
                    </Box>
                </ScaleFade>
            </ContextSheetContent>
        </ContextSheet>
    )
}