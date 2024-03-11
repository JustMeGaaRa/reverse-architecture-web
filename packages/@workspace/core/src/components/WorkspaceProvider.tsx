import { IWorkspaceSnapshot, Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import * as Y from "yjs";
import { WorkspaceContext } from "../contexts";

const WorkspaceMapParam = "workspace";
const workspaceDocument = new Y.Doc();
const undoManager = new Y.UndoManager(workspaceDocument.getMap(WorkspaceMapParam));

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState<IWorkspaceSnapshot>(Workspace.Empty.toSnapshot());

    return (
        <WorkspaceContext.Provider
            value={{
                workspaceDocument,
                workspace,
                undoManager,
                setWorkspace,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    )
};