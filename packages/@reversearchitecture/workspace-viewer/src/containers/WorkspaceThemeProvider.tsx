import { ViewType } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { ReverseArchitectureTheme } from "../types";
import { WorkspaceThemeContext } from "../context";

export const WorkspaceThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ theme, setTheme ] = useState(ReverseArchitectureTheme);
    const accentColors = {
        [ViewType.SystemLandscape]: "yellow",
        [ViewType.SystemContext]: "yellow",
        [ViewType.Container]: "blue",
        [ViewType.Component]: "purple",
        [ViewType.Deployment]: "green",
    }

    return (
        <WorkspaceThemeContext.Provider value={{ accentColors, theme, setTheme }}>
            {children}
        </WorkspaceThemeContext.Provider>
    )
};