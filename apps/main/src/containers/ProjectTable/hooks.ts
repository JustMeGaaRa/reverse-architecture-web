import { useCallback, useContext, useEffect } from "react";
import { TableContext } from "./context";
import { TableRowCheckedState } from "./types";

export const useTableStore = () => {
    return useContext(TableContext);
}

export const useTable = () => {
    const { data, setData } = useTableStore();

    const setTableRows = useCallback((rows: any[]) => {
        setData(rows.map(row => ({
            key: row.projectId,
            checked: TableRowCheckedState.Unchecked,
            data: row
        })));
    }, [setData]);

    const selectAllRows = useCallback((checked: TableRowCheckedState) => {
        setData(data.map(item => ({
            ...item,
            checked
        })));
    }, [data, setData]);

    const selectSingleRow = useCallback((key: string, checked: TableRowCheckedState) => {
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

export const useOnCheckedChange = (callback: (selected: any[]) => void) => {
    const { data } = useTable();

    useEffect(() => {
        const selected = data
            .filter(item => item.checked === TableRowCheckedState.Checked)
            .map(item => item.data);
        
        callback?.(selected);
    }, [data, callback]);
}