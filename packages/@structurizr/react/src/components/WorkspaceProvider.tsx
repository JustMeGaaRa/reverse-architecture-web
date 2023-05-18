import { Workspace } from "@structurizr/dsl";
import { createContext } from "react";

export interface IWorkspaceContext {
    workspace: Workspace;
}

export const WorkspaceContext = createContext<IWorkspaceContext>({
    workspace: Workspace.Empty,
})

export const WorkspaceProvider = WorkspaceContext.Provider;