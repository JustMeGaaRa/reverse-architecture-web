import {
    Table,
    TableContainer,
    Tbody,
    Thead,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { ProjectInfo, TableColumnInfo } from "../types";
import { TableHeader, TableRow,  } from "../components";
import { useOnCheckedChange, useTable } from "../hooks";

export const ProjectTableView: FC<{
    projects: any[],
    onClick?: (project: ProjectInfo) => void;
    onSelected?: (selected: any[]) => void;
    onRemove?: (data: any[]) => void;
}> = ({
    projects,
    onClick,
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

    useEffect(() => {
        setTableRows(projects);
    }, [projects, setTableRows]);

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