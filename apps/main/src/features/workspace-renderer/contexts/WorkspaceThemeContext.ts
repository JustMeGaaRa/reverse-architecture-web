import { IWorkspaceTheme, ViewType } from "@structurizr/dsl";
import { ReverseArchitectureTheme } from "@structurizr/react";
import { createContext } from "react";

export const WorkspaceThemeContext = createContext<{
    accentColors: {
        [ViewType.SystemLandscape]: string;
        [ViewType.SystemContext]: string;
        [ViewType.Container]: string;
        [ViewType.Component]: string;
        [ViewType.Deployment]: string;
    },
    theme: IWorkspaceTheme;
    setTheme: (theme: IWorkspaceTheme) => void;
}>({
    accentColors: {
        [ViewType.SystemLandscape]: "lime",
        [ViewType.SystemContext]: "lime",
        [ViewType.Container]: "blue",
        [ViewType.Component]: "purple",
        [ViewType.Deployment]: "green",
    },
    theme: ReverseArchitectureTheme,
    setTheme: () => {}
});