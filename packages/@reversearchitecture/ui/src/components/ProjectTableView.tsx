import {
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { MoreHoriz } from "iconoir-react";
import { FC } from "react";

export const ProjectTableView: FC<{
    data: any[],
    onClick?: () => void;
}> = ({
    data,
    onClick
}) => {
    const columns = Object.keys(data[0]);

    return (
        <TableContainer>
            <Table style={{
                borderCollapse: "separate",
                borderSpacing: "0 4px"
                }}
            >
                <Thead>
                    <Tr>
                        {columns.map((name: any) => (
                            <Th key={name} borderBottom={0}>{name}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item) => (
                        <Tr
                            key={item.name}
                            cursor={"pointer"}
                            height={12}
                            marginBottom={1}
                            marginTop={1}
                            _hover={{ background: "gray.100" }}
                            onClick={onClick}
                        >
                            {columns.map((name: any) => (
                                <Td
                                    key={name}
                                    borderBottom={0}
                                    paddingBottom={0}
                                    paddingTop={0}
                                >
                                        {item[name]}
                                </Td>
                            ))}
                            <Td
                                borderBottom={0}
                                paddingBottom={0}
                                paddingTop={0}
                            >
                                <IconButton
                                    aria-label={"more options"}
                                    colorScheme={"gray"}
                                    icon={<MoreHoriz />}
                                    size={"sm"}
                                    variant={"ghost"}
                                    title={"more options"}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}