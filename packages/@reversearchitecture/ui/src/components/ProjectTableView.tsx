import {
    Checkbox,
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
import { ChangeEvent, createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

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
    const { data, setRows } = useTable();

    useEffect(() => {
        setRows(projects);
    }, [projects, setRows]);

    useEffect(() => {
        onSelected?.(data.filter(item => item.isSelected).map(item => item.data));
    }, [data, onSelected]);

    const handleOnChange = useCallback(() => {
        // onSelected?.(data.filter(item => item.isSelected).map(item => item.data));
    }, [data, onSelected]);

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
                    <TableHeader
                        columns={columns}
                        onChange={handleOnChange}
                    />
                </Thead>
                <Tbody>
                    {data.map((item) => (
                        <TableRow
                            key={item.key}
                            columns={columns}
                            data={item.data}
                            isSelected={item.isSelected}
                            onChange={handleOnChange}
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export const TableHeader: FC<{
    columns: string[];
    isSelected?: boolean;
    onChange?: () => void;
}> = ({
    columns,
    isSelected,
    onChange
}) => {
    const { setAllSelected } = useTable();

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setAllSelected(event.target.checked);
        onChange?.();
    }, [onChange, setAllSelected]);
    
    return (
        <Tr>
            <Th width={12}>
                <Checkbox
                    isChecked={isSelected}
                    onChange={handleOnChange}
                />
            </Th>
            {columns.map((name: any) => (
                <Th key={name} width={12}>
                    {name}
                </Th>
            ))}
            <Th width={12} />
        </Tr>
    )
}

export const TableRow: FC<{
    columns: string[];
    data: any;
    isSelected?: boolean;
    onChange?: () => void;
    onClick?: () => void;
}> = ({
    columns,
    data,
    isSelected,
    onChange,
    onClick
}) => {
    const { setSelectedRow } = useTable();

    const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSelectedRow(data["name"], event.target.checked);
        onChange?.();
    }, [data, onChange, setSelectedRow]);

    return (
        <Tr
            backgroundColor={isSelected ? "whiteAlpha.200" : undefined}
            backdropFilter={"blur(8px)"}
            borderRadius={16}
            cursor={"pointer"}
            _hover={{ background: "whiteAlpha.100" }}
            onClick={onClick}
        >
            <Td width={12}>
                <Checkbox
                    isChecked={isSelected}
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

export type RowData = {
    key: string;
    isSelected: boolean;
    data: any;
}

export const TableContext = createContext<{
    data: RowData[];
    setData: (data: RowData[]) => void;
}>({
    data: [],
    setData: () => {}
})

export const TableProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ data, setData ] = useState<RowData[]>([]);

    return (
        <TableContext.Provider value={{ data, setData }}>
            {children}
        </TableContext.Provider>
    )
}

export const useTable = () => {
    const { data, setData } = useContext(TableContext);

    const setRows = useCallback((rows: any[]) => {
        setData(rows.map(row => ({
            key: row["name"],
            isSelected: false,
            data: row
        })));
    }, [setData]);

    const deleteRow = useCallback((key: string) => {
        setData(data.filter(item => item.key !== key));
    }, [data, setData]);

    const setAllSelected = useCallback((selected: boolean) => {
        setData(data.map(item => ({
            ...item,
            isSelected: selected
        })));
    }, [data, setData]);

    const setSelectedRow = useCallback((key: string, selected: boolean) => {
        setData(data.map(item => {
            if (item.key === key) {
                return {
                    ...item,
                    isSelected: selected
                }
            }

            return item;
        }));
    }, [data, setData]);

    return {
        data,
        setRows,
        deleteRow,
        setAllSelected,
        setSelectedRow
    }
}