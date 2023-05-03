import {
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Flex
} from "@chakra-ui/react";
import { ProjectApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    ProjectList
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useState
} from "react";

export const ProjectListContent: FC<PropsWithChildren<{

}>> = ({
    
}) => {
    const [projects, setProjects] = useState([]);

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
            <ContextSheetContent padding={0}>
                <Tabs height={"100%"}>
                    <TabList px={6}>
                        <Tab>My projects</Tab>
                        <Tab>Shared</Tab>
                        <Tab>Archived</Tab>
                    </TabList>
                    <TabPanels height={"calc(100% - 42px)"}>
                        <TabPanel height={"100%"}>
                            <ProjectList projects={projects} />
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