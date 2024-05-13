import { ViewType } from "@structurizr/dsl";
import { ReverseArchitectureTheme } from "@structurizr/react";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceThemeContext } from "../contexts";

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