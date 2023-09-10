import {
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Flex,
    IconButton,
    ButtonGroup,
    Box,
    Divider,
    Button,
    Text,
    ScaleFade
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    ProjectCardView,
    ProjectTableView,
    TableProvider,
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
import { NavigationSource } from "../../../containers";
import { ProjectApi } from "../../../services";
import { ContentViewMode, useContentViewMode } from "./hooks";

export const ProjectListContent: FC<PropsWithChildren> = () => {
    const { view, setView } = useContentViewMode(ContentViewMode.Card);
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

    const handleOnRemove = useCallback((data: any[]) => {
        data.forEach(item => {
            api.removeProject(item.projectId);
        });
        api.getProjects()
            .then(projects => {
                setProjects(projects);
            })
            .catch(error => {
                console.error(error);
            });
    }, [api, setProjects]);

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
                    isDisabled={true}
                    leftIcon={<AddPageAlt />}
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
                                isActive={view === "card"}
                                icon={<ViewGrid />}
                                onClick={() => setView(ContentViewMode.Card)}
                            />
                            <IconButton
                                aria-label={"table view"}
                                isActive={view === "table"}
                                icon={<List />}
                                onClick={() => setView(ContentViewMode.Table)}
                            />
                        </ButtonGroup>
                    </TabList>
                    <TabPanels height={"calc(100% - 42px)"}>
                        <TabPanel height={"100%"}>
                            <Box padding={6} height={"100%"} overflowY={"scroll"}>
                                {view === ContentViewMode.Card && (
                                    <ProjectCardView
                                        projects={projects}
                                        onRemove={handleOnRemove}
                                    />
                                )}
                                {view === ContentViewMode.Table && (
                                    <TableProvider>
                                        <ProjectTableView
                                            projects={projects}
                                            onSelected={setSelected}
                                            onRemove={handleOnRemove}
                                        />
                                    </TableProvider>
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
                <ScaleFade initialScale={0.8} in={selected.length > 0}>
                    <Box position={"absolute"} bottom={4} left={"50%"} transform={"translateX(-50%)"}>
                        <Toolbar>
                            <ToolbarSection>
                                <Text paddingX={2}>{`${selected.length} item(s) selected`}</Text>
                            </ToolbarSection>
                            <ToolbarSection>
                                <IconButton
                                    aria-label={"copy"}
                                    icon={<Copy />}
                                    title={"copy"}
                                />
                                <IconButton
                                    aria-label={"remove"}
                                    icon={<BinMinus />}
                                    title={"remove"}
                                    onClick={() => handleOnRemove(selected)}
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