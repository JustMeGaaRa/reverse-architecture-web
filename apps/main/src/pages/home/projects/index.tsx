import {
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Flex,
    useDisclosure,
    IconButton,
    ButtonGroup,
    Box,
    Divider
} from "@chakra-ui/react";
import { ProjectApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    ProjectCardView,
    ProjectTableView
} from "@reversearchitecture/ui";
import { Folder, List, ViewGrid } from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useState
} from "react";
import { useContentViewMode } from "./hooks";

export const ProjectListContent: FC<PropsWithChildren<{

}>> = ({
    
}) => {
    const { view, setView } = useContentViewMode("card");
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        const api = new ProjectApi();
        api.getProjects()
            .then(projects => {
                setProjects(projects);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <ContextSheet>
            <ContextSheetHeader title={"All Projects"} />
            <Divider />
            <ContextSheetContent padding={0}>
                <Tabs height={"100%"}>
                    <TabList background={"gray.30"} px={6} height={12}>
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
                                onClick={() => setView("card")}
                            />
                            <IconButton
                                aria-label={"table view"}
                                isActive={view === "table"}
                                icon={<List />}
                                onClick={() => setView("table")}
                            />
                        </ButtonGroup>
                    </TabList>
                    <TabPanels height={"calc(100% - 42px)"}>
                        <TabPanel height={"100%"}>
                            <Box padding={6} height={"100%"} overflowY={"scroll"}>
                                {view === "table" && (
                                    <ProjectTableView data={projects} />
                                )}
                                {view === "card" && (
                                    <ProjectCardView projects={projects} />
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
            </ContextSheetContent>
        </ContextSheet>
    )
}