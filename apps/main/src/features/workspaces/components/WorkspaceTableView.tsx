import {
    Table,
    TableContainer,
    Tbody,
    Thead,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { TableHeader, TableRow,  } from ".";
import { useOnCheckedChange, useTable } from "../hooks";
import { WorkspaceGroupInfo, TableColumnInfo, WorkspaceInfo } from "../types";

export const WorkspaceTableView: FC<{
    groups: WorkspaceGroupInfo[],
    onClick?: (workspace: WorkspaceInfo) => void;
    onGroupClick?: (group: WorkspaceGroupInfo) => void;
    onSelected?: (selected: WorkspaceGroupInfo[]) => void;
    onRemove?: (groups: WorkspaceGroupInfo[]) => void;
}> = ({
    groups,
    onClick,
    onGroupClick,
    onSelected,
    onRemove
}) => {
    const columns: TableColumnInfo[] = [
        { title: "Name", name: "name" },
        { title: "Created Date", name: "createdDate" },
        { title: "Created By", name: "createdBy" },
        { title: "Last Modified Date", name: "lastModifiedDate" },
        { title: "Last Modified By", name: "lastModifiedBy" },
    ];
    const { data, setTableRows } = useTable();

    useEffect(() => setTableRows(groups), [groups, setTableRows]);
    useOnCheckedChange(onSelected);

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
                    <TableHeader columns={columns} />
                </Thead>
                <Tbody>
                    {data.map((item) => (
                        <TableRow
                            key={item.key}
                            columns={columns}
                            data={item.data}
                            checked={item.checked}
                            onClick={() => onClick?.(item.data)}
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}