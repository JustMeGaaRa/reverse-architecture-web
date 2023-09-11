import { createContext } from "react";
import { TableRowData } from "./types";

export const TableContext = createContext<{
    data: TableRowData[];
    setData: (data: TableRowData[]) => void;
}>({
    data: [],
    setData: () => {}
});