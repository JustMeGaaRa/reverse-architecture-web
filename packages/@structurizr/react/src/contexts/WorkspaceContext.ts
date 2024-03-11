import { Workspace, WorkspaceInfo } from "@structurizr/y-workspace";
import { createContext, Dispatch, SetStateAction } from "react";

export const WorkspaceExplorerContext = createContext<{
    workspaces: Array<WorkspaceInfo>;
    setWorkspaces: Dispatch<SetStateAction<Array<WorkspaceInfo>>>;
}>({
    workspaces: [],
    setWorkspaces: () => { console.log("Workspace Explorer Context: dummy setWorkspaces") },
});

export const WorkspaceContext = createContext<{
    workspace: Workspace;
    setWorkspace: Dispatch<SetStateAction<Workspace>>;
}>({
    workspace: null,
    setWorkspace: () => { console.log("Workspace Context: dummy setWorkspace") },
});