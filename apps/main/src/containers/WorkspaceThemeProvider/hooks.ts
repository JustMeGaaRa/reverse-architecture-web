import { useContext } from "react"
import { WorkspaceThemeContext } from "../";

export const useWorkspaceTheme = () => {
    const { theme } = useContext(WorkspaceThemeContext);

    return { theme }
}