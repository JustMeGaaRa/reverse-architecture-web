import { useContext } from "react";
import { ToolbarSubmenuContext } from "../context";


export const useToolbarSubmenu = () => {
    return useContext(ToolbarSubmenuContext);
}