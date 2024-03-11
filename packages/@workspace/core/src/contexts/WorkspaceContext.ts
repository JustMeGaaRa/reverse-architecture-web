import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { createContext, SetStateAction, Dispatch } from "react";
import * as Y from "yjs";

export type WorkspaceStore = {
    workspaceDocument?: Y.Doc;
    workspace: IWorkspaceSnapshot;
    undoManager?: Y.UndoManager;
    setWorkspace?: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
};

export const WorkspaceContext = createContext<WorkspaceStore>(null);