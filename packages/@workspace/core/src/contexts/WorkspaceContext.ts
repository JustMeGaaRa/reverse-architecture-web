import { Workspace } from "@structurizr/dsl";
import { createContext, SetStateAction, Dispatch } from "react";

// TODO: consider using mutable workspace object instead of immutable (using yjs internally for collaboration)
export type WorkspaceStore = {
    workspace: Workspace;
    setWorkspace?: Dispatch<SetStateAction<Workspace>>;
};

export const WorkspaceContext = createContext<WorkspaceStore>({
    workspace: undefined,
    setWorkspace: () => {},
});