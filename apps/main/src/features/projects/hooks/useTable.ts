import { useCallback } from "react";
import { useTableStore } from "../hooks";
import { ItemCheckedState } from "../types";

export const useTable = () => {
    const { data, setData } = useTableStore();

    const setTableRows = useCallback((rows: any[]) => {
        setData(rows.map(row => ({
            key: row.projectId,
            checked: ItemCheckedState.Unchecked,
            data: row
        })));
    }, [setData]);

    const selectAllRows = useCallback((checked: ItemCheckedState) => {
        setData(data.map(item => ({
            ...item,
            checked
        })));
    }, [data, setData]);

    const selectSingleRow = useCallback((key: string, checked: ItemCheckedState) => {
        setData(data.map(item => {
            if (item.key === key) {
                return {
                    ...item,
                    checked
                }
            }

            return item;
        }));
    }, [data, setData]);

    return {
        data,
        setTableRows,
        selectAllRows,
        selectSingleRow
    }
}