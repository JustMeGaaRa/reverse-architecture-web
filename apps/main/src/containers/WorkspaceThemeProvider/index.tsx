import { IWorkspaceTheme } from "@structurizr/dsl";
import { ReverseArchitectureTheme } from "@reversearchitecture/workspace-viewer";
import { createContext } from "react";

export const WorkspaceThemeContext = createContext<{ theme: IWorkspaceTheme; }>({ theme: ReverseArchitectureTheme });

export const WorkspaceThemeProvider = WorkspaceThemeContext.Provider;

export * from "./hooks";