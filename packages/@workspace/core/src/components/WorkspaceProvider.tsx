import { IWorkspace, Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import * as Y from "yjs";
import { WorkspaceContext } from "../contexts";

const WorkspaceMapParam = "workspace";
const workspaceDocument = new Y.Doc();
const undoManager = new Y.UndoManager(workspaceDocument.getMap(WorkspaceMapParam));

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    console.log("workspace provider");
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());

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