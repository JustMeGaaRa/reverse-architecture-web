import { Box, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Children, FC, PropsWithChildren } from "react";
import { SelectionItemProvider } from "../components";
import { useOnSelectionChanged, useSelectionContainer } from "../hooks";
import { TableColumnInfo } from "../types";

export const WorkspaceTable: FC<PropsWithChildren<{
    columns: TableColumnInfo[];
    onSelected?: (indicies: Array<number>) => void;
}>> = ({
    children,
    columns,
    onSelected
}) => {
    const { selectedIndicies } = useSelectionContainer();

    useOnSelectionChanged(onSelected);

    return (
        <TableContainer>
            <Table
                size={"sm"}
                style={{
                    borderCollapse: "separate",
                    borderSpacing: "0 4px"
                }}
                variant={"unstyled"}
            >
                <Thead>
                    <Tr>
                        <Th width={12}>
                            <Box height={50} width={100} />
                        </Th>
                        {columns.map(({ title, name }) => (
                            <Th key={name}>
                                {title}
                            </Th>
                        ))}
                        <Th width={12} />
                    </Tr>
                </Thead>
                <Tbody>
                    {Children.map(children, ((child, index) => (
                        <SelectionItemProvider
                            key={index}
                            index={index}
                            isSelected={selectedIndicies.includes(index)}
                        >
                            {child}
                        </SelectionItemProvider>
                    )))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}