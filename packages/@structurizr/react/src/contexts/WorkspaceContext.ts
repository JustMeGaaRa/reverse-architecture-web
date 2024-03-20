import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { createContext, Dispatch, SetStateAction } from "react";

export const WorkspaceContext = createContext<{
    workspace: IWorkspaceSnapshot;
    setWorkspace: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
}>({
    workspace: undefined,
    setWorkspace: () => { console.debug("Workspace Context: dummy setWorkspace") },
});