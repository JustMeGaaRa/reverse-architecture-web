import {
    Box,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    TableContainer,
    Tabs,
    Td,
    Th,
    Tr,
    Thead,
    Tbody
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ProjectList: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    const metadata = [
        { name: "Name", key: "name" },
        { name: "Last Updated", key: "date" },
        { name: "Updated By", key: "updatedBy" },
        { name: "Access", key: "access" }
    ]
    const data = [
        { name: "Project 1", date: "29.03.2023", updatedBy: "pavlo@rvrs.io", access: "write" },
        { name: "Project 2", date: "30.03.2023", updatedBy: "vitalii@rvrs.io", access: "readonly" },
        { name: "Project 3", date: "30.03.2023", updatedBy: "oleh@rvrs.io", access: "readonly" },
        { name: "Project 4", date: "31.03.2023", updatedBy: "romano@rvrs.io", access: "readonly" }
    ]

    return (
        <Box>
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
                                    {metadata.map((item) => (
                                        <Th key={item.name}>{item.name}</Th>
                                    ))}
                                </Thead>
                                <Tbody>
                                    {data.map((item) => {
                                        return (
                                            <Tr
                                                cursor={"pointer"}
                                                key={item.name}
                                                _hover={{ background: "whiteAlpha.100" }}
                                            >
                                                {metadata.map((meta) => (
                                                    <Td key={meta.name}>{item[meta.key]}</Td>
                                                ))}
                                            </Tr>
                                        )
                                    })}
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