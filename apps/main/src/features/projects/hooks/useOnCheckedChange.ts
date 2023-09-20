import { useEffect } from "react";
import { useTable } from "../hooks";
import { ItemCheckedState } from "../types";

export const useOnCheckedChange = (callback: (selected: any[]) => void) => {
    const { data } = useTable();

    useEffect(() => {
        const selected = data
            .filter(item => item.checked === ItemCheckedState.Checked)
            .map(item => item.data);
        
        callback?.(selected);
    }, [data, callback]);
}