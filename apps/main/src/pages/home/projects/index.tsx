import {
    Box,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    TableContainer,
    Td,
    Th,
    Tr,
    Thead,
    Tbody,
    Divider,
    VStack,
    Wrap,
    WrapItem,
    Flex
} from "@chakra-ui/react";
import { ProjectApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader,
    EmptyContent,
    ProjectCard
} from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useState
} from "react";

export const ProjectList: FC<PropsWithChildren<{

}>> = ({
    
}) => {
    const [projects, setProjects] = useState([]);

    const metadata = [
        { name: "Name", key: "name" },
        { name: "Last Updated", key: "updated" },
        { name: "Updated By", key: "updatedBy" },
        { name: "Access", key: "access" }
    ]

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
            <Box>
                <ContextSheetHeader title={"All Projects"} />
                <ContextSheetContent padding={0}>
                    <Tabs>
                        <TabList px={6}>
                            <Tab>My projects</Tab>
                            <Tab>Shared</Tab>
                            <Tab>Archived</Tab>
                        </TabList>
                        <TabPanels px={6} pt={6}>
                            <TabPanel padding={0}>
                                <Wrap spacing={6}>
                                    {projects.map((item) => (
                                        <WrapItem key={item.name}>
                                            <ProjectCard
                                                name={item.name}
                                                updated={item.updated}
                                            />
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            </TabPanel>
                            <TabPanel>
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
                            <TabPanel>
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
            </Box>
        </ContextSheet>
    )
}