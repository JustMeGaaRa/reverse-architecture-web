import { Box, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useOnWorkspaceSelected } from "../hooks";
import { TableColumnInfo } from "../types";

export const WorkspaceTable: FC<PropsWithChildren<{
    columns: TableColumnInfo[];
    onSelected?: (indicies: Array<string>) => void;
}>> = ({
    children,
    columns,
    onSelected
}) => {
    useOnWorkspaceSelected(onSelected);

    return (
        <TableContainer>
            <Table
                size={"sm"}
                style={{
                    borderCollapse: "separate",
                    borderSpacing: "0 4px"
                }}
                layout={"fixed"}
                variant={"unstyled"}
            >
                <Thead>
                    <Tr>
                        <Th width={16}>
                            <Box height={50} width={100} />
                        </Th>
                        {columns.map(({ title, name }) => (
                            <Th key={name}>
                                {title}
                            </Th>
                        ))}
                        <Th width={16} />
                    </Tr>
                </Thead>
                <Tbody>
                    {children}
                </Tbody>
            </Table>
        </TableContainer>
    )
}