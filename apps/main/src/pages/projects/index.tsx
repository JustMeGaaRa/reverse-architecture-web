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
    Tbody
} from "@chakra-ui/react";
import { ProjectApi } from "@reversearchitecture/services";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export const ProjectList: FC<PropsWithChildren<{

}>> = ({
    
}) => {
    const [projects, setProjects] = useState([]);

    const metadata = [
        { name: "Name", key: "name" },
        { name: "Last Updated", key: "date" },
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
        <Box
            padding={"24px"}
        >
            <Heading as={"h1"} mb={8}>All Projects</Heading>
            <Tabs>
                <TabList>
                    <Tab>My projects</Tab>
                    <Tab>Shared</Tab>
                    <Tab>Archived</Tab>
                </TabList>
                <TabPanels>
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
                    <TabPanel></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}