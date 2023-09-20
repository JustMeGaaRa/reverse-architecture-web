import { Checkbox, Th, Tr } from "@chakra-ui/react";
import { ChangeEvent, FC, useCallback } from "react";
import { useTable } from "../hooks";
import { ItemCheckedState, TableColumnInfo } from "../types";

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