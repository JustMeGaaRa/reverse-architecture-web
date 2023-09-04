import { ViewType } from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceThemeContext } from "../context";

export const useWorkspaceTheme = () => {
    const { accentColors, theme, setTheme } = useContext(WorkspaceThemeContext);

    const getViewAccentColor = useCallback((viewType: ViewType) => {
        return accentColors?.[viewType] ?? "whiteAlpha";
    }, [accentColors]);

    return {
        theme,
        setTheme,
        getViewAccentColor
    }
}