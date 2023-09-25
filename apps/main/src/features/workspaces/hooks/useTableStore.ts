import { useContext } from "react";
import { TableContext } from "../contexts";

export const useTableStore = () => {
    return useContext(TableContext);
}