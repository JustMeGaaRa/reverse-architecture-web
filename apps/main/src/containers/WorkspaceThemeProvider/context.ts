import { IWorkspaceTheme } from "@structurizr/dsl";
import { ReverseArchitectureTheme } from "@reversearchitecture/workspace-viewer";
import { createContext } from "react";

export const WorkspaceThemeContext = createContext<{
    theme: IWorkspaceTheme;
    setTheme: (theme: IWorkspaceTheme) => void;
}>({
    theme: ReverseArchitectureTheme,
    setTheme: () => {}
});