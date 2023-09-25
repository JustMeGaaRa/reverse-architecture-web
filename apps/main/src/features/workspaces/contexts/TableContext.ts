import { createContext } from "react";
import { ItemData } from "../types";

export const TableContext = createContext<{
    data: ItemData[];
    setData: (data: ItemData[]) => void;
}>({
    data: [],
    setData: () => {}
});