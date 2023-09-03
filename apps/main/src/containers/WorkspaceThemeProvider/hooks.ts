import { useContext } from "react"
import { WorkspaceThemeContext } from "./context";

export const useWorkspaceTheme = () => {
    return useContext(WorkspaceThemeContext);
}