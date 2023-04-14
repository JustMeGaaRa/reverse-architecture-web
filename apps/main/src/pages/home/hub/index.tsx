import {
    Box,
    Table,
    TableContainer,
    Td,
    Th,
    Tr,
    Thead,
    Tbody,
    IconButton,
    Divider
} from "@chakra-ui/react";
import { CommunityHubApi } from "@reversearchitecture/services";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { OpenInWindow } from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useEffect,
    useState
} from "react";
import { NavLink } from "react-router-dom";

export const CommunityHub: FC<PropsWithChildren<{

}>> = ({

}) => {
    const [workspaces, setWorkspaces] = useState([]);

    const metadata = [
        { name: "Name", key: "name" },
        { name: "Last Updated", key: "date" },
        { name: "Updated By", key: "updatedBy" },
        { name: "Access", key: "access" }
    ]

    useEffect(() => {
        const api = new CommunityHubApi();
        api.getWorkspaces()
            .then(workspaces => {
                setWorkspaces(workspaces);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <ContextSheet>
            <Box>
                <ContextSheetHeader title={"Community Hub"} />
                <Divider />
                <ContextSheetContent>
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    {metadata.map((item) => (
                                        <Th key={item.name}>{item.name}</Th>
                                    ))}
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {workspaces.map((item) => (
                                    <Tr
                                        key={item.name}
                                        cursor={"pointer"}
                                        _hover={{ background: "whiteAlpha.100" }}
                                    >
                                        {metadata.map((meta) => (
                                            <Td key={meta.name}>{item[meta.key]}</Td>
                                        ))}
                                        <Td>
                                            <IconButton
                                                as={NavLink}
                                                aria-label={"open"}
                                                icon={<OpenInWindow />}
                                                variant={"ghost"}
                                                title={"open"}
                                                to={`../workspace/${item.workspaceId}`}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ContextSheetContent>
            </Box>
        </ContextSheet>
    );
}