import {
    Box,
    Button,
    ButtonGroup,
    Divider,
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
    ContentViewMode,
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle,
    Toolbar,
    ToolbarSection,
    useContentViewMode
} from "@reversearchitecture/ui";
import {
    AddPageAlt,
    BinMinus,
    Cancel,
    Copy,
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
import { useNavigate } from "react-router-dom";
import {
    NavigationSource,
    CreateProjectModal,
} from "../containers";
import {
    ProjectApi,
    ProjectInfo,
    ProjectList
} from "../features";

export const ProjectListPage: FC<PropsWithChildren> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ projectApi ] = useState(new ProjectApi());
    const [ projects, setProjects ] = useState([]);
    const [ selectedProjects, setSelectedProjects ] = useState<any[]>([]);
    const { view, setView } = useContentViewMode(ContentViewMode.Card);
    const navigate = useNavigate();

    useEffect(() => {
        projectApi.getProjects()
            .then(projects => {
                setProjects(projects);
            })
            .catch(error => {
                console.error(error);
            });
    }, [projectApi]);
    
    const handleOnCreate = useCallback((project: ProjectInfo) => {
        projectApi.saveProject(project);
        setProjects(projects.concat(project));
    }, [projectApi, projects, setProjects]);

    const handleOnRemove = useCallback(() => {
        selectedProjects.map(item => {
            projectApi.deleteProject(item.projectId);
        });
        setProjects(projects.filter(x => !selectedProjects.some(y => y.projectId === x.projectId)));
    }, [projectApi, selectedProjects, projects, setProjects]);

    const handleOnClose = useCallback(() => {
        setSelectedProjects([]);
    }, [setSelectedProjects]);

    const handleOnProjectClick = useCallback((project: ProjectInfo) => {
        navigate(`/workspaces/${"big-bank-plc"}?list=true&projectId=${project.projectId}`)
    }, [navigate]);

    return (
        <ContextSheet>
            <NavigationSource>
                <ButtonGroup size={"md"} variant={"outline"}>
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
                </ButtonGroup>
            </NavigationSource>

            <CreateProjectModal
                isOpen={isOpen}
                onClose={onClose}
                onCreate={handleOnCreate}
            />

            <ContextSheetHeader>
                <ContextSheetTitle title={"All Projects"} />
            </ContextSheetHeader>

            <Divider />
            
            <ContextSheetBody>
                <Tabs height={"100%"}>
                    <TabList backgroundColor={"whiteAlpha.50"} height={12} paddingX={6}>
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
                    <TabPanels height={"calc(100% - 42px)"} padding={6} overflowY={"scroll"}>
                        <TabPanel>
                            <ProjectList
                                projects={projects}
                                view={view}
                                emptyTitle={"No projects"}
                                emptyDescription={"To get started, click the \"Create New Project\" button to create a new project."}
                                onSelected={setSelectedProjects}
                                onRemove={handleOnRemove}
                                onClick={handleOnProjectClick}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ProjectList
                                projects={[]}
                                view={view}
                                emptyTitle={"No shared projects"}
                                emptyDescription={"To get started, click the \"Create New Project\" button to create a new project."}
                                onSelected={setSelectedProjects}
                                onRemove={handleOnRemove}
                                onClick={handleOnProjectClick}
                            />
                        </TabPanel>
                        <TabPanel>
                            <ProjectList
                                projects={[]}
                                view={view}
                                emptyTitle={"No archived projects"}
                                emptyDescription={"To get started, click the \"Create New Project\" button to create a new project."}
                                onSelected={setSelectedProjects}
                                onRemove={handleOnRemove}
                                onClick={handleOnProjectClick}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <ScaleFade in={selectedProjects.length > 0}>
                    <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
                        <Toolbar>
                            <ToolbarSection>
                                <Text paddingX={2}>
                                    {`${selectedProjects.length} item(s) selected`}
                                </Text>
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"copy"}
                                    icon={<Copy />}
                                    isDisabled
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
            </ContextSheetBody>
        </ContextSheet>
    )
}