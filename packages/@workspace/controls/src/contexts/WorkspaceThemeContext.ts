import { ITheme, ViewType } from "@structurizr/dsl";
import { ReverseArchitectureTheme } from "@workspace/core";
import { createContext } from "react";

export const WorkspaceThemeContext = createContext<{
    accentColors: {
        [ViewType.SystemLandscape]: string;
        [ViewType.SystemContext]: string;
        [ViewType.Container]: string;
        [ViewType.Component]: string;
        [ViewType.Deployment]: string;
    },
    theme: ITheme;
    setTheme: (theme: ITheme) => void;
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