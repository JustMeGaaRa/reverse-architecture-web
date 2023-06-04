import { defaultTheme, IWorkspaceTheme } from "@structurizr/dsl";
import { createContext } from "react";

export const WorkspaceThemeContext = createContext<{ theme: IWorkspaceTheme; }>({ theme: defaultTheme });

export const WorkspaceThemeProvider = WorkspaceThemeContext.Provider;

export * from "./hooks";