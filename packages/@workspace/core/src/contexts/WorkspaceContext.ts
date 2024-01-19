import { IWorkspace } from "@structurizr/dsl";
import { createContext, SetStateAction, Dispatch } from "react";
import * as Y from "yjs";

export type WorkspaceStore = {
    workspaceDocument?: Y.Doc;
    workspace: IWorkspace;
    undoManager?: Y.UndoManager;
    setWorkspace?: Dispatch<SetStateAction<IWorkspace>>;
};

export const WorkspaceContext = createContext<WorkspaceStore>(null);