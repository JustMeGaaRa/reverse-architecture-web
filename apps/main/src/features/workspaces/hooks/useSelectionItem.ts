import { useContext } from "react";
import { SelectionItemContext } from "../contexts";

export const useSelectionItem = () => {
    return useContext(SelectionItemContext);
}