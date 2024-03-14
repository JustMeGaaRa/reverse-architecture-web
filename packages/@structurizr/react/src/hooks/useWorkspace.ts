import { useContext } from "react";
import { ThemesContext, WorkspaceContext } from "../contexts";

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
}

export const useThemes = () => {
    return useContext(ThemesContext);
}