import { useContext } from "react";
import { ToolbarContext } from "../context";

export const useToolbar = () => {
    return useContext(ToolbarContext);
}