import {
    Checkbox,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { MoreHoriz } from "iconoir-react";
import {
    ChangeEvent,
    FC,
    PropsWithChildren,
    useEffect,
    useCallback,
    useState
} from "react";
import { TableContext } from "./context";
import { useOnCheckedChange, useTable } from "./hooks";
import { TableRowCheckedState, TableRowData } from "./types";

export const ProjectTableView: FC<{
    projects: any[],
    onClick?: () => void;
    onSelected?: (selected: any[]) => void;
    onRemove?: (data: any[]) => void;
}> = ({
    projects,
    onClick,
    onSelected,
    onRemove
}) => {
    const columns = [
        "name",
        "updated",
        "updatedBy",
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
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export const ProjectTableProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ data, setData ] = useState<TableRowData[]>([]);

    return (
        <TableContext.Provider value={{ data, setData }}>
            {children}
        </TableContext.Provider>
    )
}

export const TableHeader: FC<{ columns: string[]; }> = ({ columns }) => {
    const { data, selectAllRows } = useTable();

    const checkedCount = data.filter(row => row.checked === TableRowCheckedState.Checked).length;
    const totalCount = data.length;
    const checkedState = checkedCount === totalCount
        ? TableRowCheckedState.Checked
        : checkedCount > 0
            ? TableRowCheckedState.Indeterminate
            : TableRowCheckedState.Unchecked;
    const isChecked = checkedState === TableRowCheckedState.Checked;
    const isIndeterminate = checkedState === TableRowCheckedState.Indeterminate;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
            ? TableRowCheckedState.Checked
            : TableRowCheckedState.Unchecked;
        selectAllRows(checked);
    }, [selectAllRows]);
    
    return (
        <Tr>
            <Th width={12}>
                <Checkbox
                    isChecked={isChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={handleOnChange}
                />
            </Th>
            {columns.map((name: any) => (
                <Th key={name}>
                    {name}
                </Th>
            ))}
            <Th width={12} />
        </Tr>
    )
}

export const TableRow: FC<{
    data: any;
    columns: string[];
    checked?: TableRowCheckedState;
    onClick?: () => void;
}> = ({
    columns,
    data,
    checked,
    onClick
}) => {
    const { selectSingleRow } = useTable();

    const isChecked = checked === TableRowCheckedState.Checked;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
            ? TableRowCheckedState.Checked
            : TableRowCheckedState.Unchecked;
        selectSingleRow(data.projectId, checked);
    }, [data, selectSingleRow]);

    return (
        <Tr
            backgroundColor={isChecked ? "whiteAlpha.200" : undefined}
            borderRadius={16}
            cursor={"pointer"}
            _hover={{ background: "whiteAlpha.100" }}
            onClick={onClick}
        >
            <Td width={12}>
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleOnChange}
                />
            </Td>
            {columns.map((name: any) => (
                <Td key={name}>
                    {data[name]}
                </Td>
            ))}
            <Td width={12}>
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
    )
}