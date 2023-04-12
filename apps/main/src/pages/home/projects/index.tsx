import {
    Box,
    Heading,
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
    VStack
} from "@chakra-ui/react";
import { ProjectApi } from "@reversearchitecture/services";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ContextSheet } from "../../../components/ContextSheet";
import { ContextSheetContent } from "../../../components/ContextSheetContent";
import { ContextSheetHeader } from "../../../components/ContextSheetHeader";
import { ProjectCard } from "../../../components/ProjectCard";

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
                <Divider />
                <ContextSheetContent>
                    <Tabs>
                        <TabList>
                            <Tab>My projects</Tab>
                            <Tab>Shared</Tab>
                            <Tab>Archived</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack gap={8} height={"100%"} overflowY={"scroll"}>
                                    {projects.map((item) => (
                                        <ProjectCard
                                            key={item.name}
                                            name={item.name}
                                            updated={item.updated}
                                            files={item.files}
                                            members={item.members}
                                        />
                                    ))}
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <TableContainer>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                {metadata.map((item) => (
                                                    <Th key={item.name}>{item.name}</Th>
                                                    ))}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {projects.map((item) => (
                                                <Tr
                                                    cursor={"pointer"}
                                                    key={item.name}
                                                    _hover={{ background: "whiteAlpha.100" }}
                                                >
                                                    {metadata.map((meta) => (
                                                        <Td key={meta.name}>{item[meta.key]}</Td>
                                                    ))}
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>
                            <TabPanel></TabPanel>
                        </TabPanels>
                    </Tabs>
                </ContextSheetContent>
            </Box>
        </ContextSheet>
    )
}