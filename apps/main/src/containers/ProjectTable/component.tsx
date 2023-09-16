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
import { ItemCheckedState, ItemData } from "./types";

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
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

type TableColumnInfo = {
    title: string;
    name: string;
}

export const TableHeader: FC<{ columns: TableColumnInfo[] }> = ({ columns }) => {
    const { data, selectAllRows } = useTable();

    const checkedCount = data.filter(row => row.checked === ItemCheckedState.Checked).length;
    const totalCount = data.length;
    const checkedState = checkedCount === totalCount
        ? ItemCheckedState.Checked
        : checkedCount > 0
            ? ItemCheckedState.Indeterminate
            : ItemCheckedState.Unchecked;
    const isChecked = checkedState === ItemCheckedState.Checked;
    const isIndeterminate = checkedState === ItemCheckedState.Indeterminate;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
            ? ItemCheckedState.Checked
            : ItemCheckedState.Unchecked;
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
            {columns.map(({ title, name }) => (
                <Th key={name}>
                    {title}
                </Th>
            ))}
            <Th width={12} />
        </Tr>
    )
}

export const TableRow: FC<{
    data: any;
    columns: TableColumnInfo[];
    checked?: ItemCheckedState;
    onClick?: () => void;
}> = ({
    columns,
    data,
    checked,
    onClick
}) => {
    const { selectSingleRow } = useTable();

    const isChecked = checked === ItemCheckedState.Checked;

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
            ? ItemCheckedState.Checked
            : ItemCheckedState.Unchecked;
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
            {columns.map(({ name }) => (
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

export const ProjectProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ data, setData ] = useState<ItemData[]>([]);

    return (
        <TableContext.Provider value={{ data, setData }}>
            {children}
        </TableContext.Provider>
    )
}