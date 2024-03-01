import { IWorkspace, Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from "react";
import * as Y from "yjs";
import { WorkspaceContext } from "../contexts";

const WorkspaceMapParam = "workspace";
const workspaceDocument = new Y.Doc();
const undoManager = new Y.UndoManager(workspaceDocument.getMap(WorkspaceMapParam));

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    console.log("workspace provider");
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());

    const setWorkspaceYDoc = useCallback((stateAction: SetStateAction<IWorkspace>) => {
        setWorkspace(currentWorkspace => {
            // NOTE: update wokspace through action using previous state
            // in case multiple hooks are used within single callback
            const updatedWorkspace = typeof stateAction === "function"
                ? stateAction(currentWorkspace)
                : stateAction;
            
            const workspaceMap = workspaceDocument.getMap(WorkspaceMapParam);
            const workspaceJson = JSON.stringify(updatedWorkspace);
            workspaceMap.set(WorkspaceMapParam, workspaceJson);

            return updatedWorkspace;
        });
    }, []);

    // useEffect(() => {
    //     console.log("workspace provider: initialize")
    //     // NOTE: initialize workspace document for initial state, before initializing undo manager
    //     setWorkspaceYDoc(initialWorkspace ?? Workspace.Empty.toObject());
    //     const undoManager = new Y.UndoManager(workspaceDocument.getMap(WorkspaceMapParam));
    //     setUndoManager(undoManager);
    // }, [initialWorkspace, setWorkspaceYDoc]);
 
    useEffect(() => {
        const onWorkspaceApplyChanges = () => {
            console.log("workspace provider: apply changes")
            // NOTE: apply any changes to the documents (undo/redo and remote changes support)
            const workspaceJson = workspaceMap.get(WorkspaceMapParam) as string;
            const workspaceObject = JSON.parse(workspaceJson) as IWorkspace;
            setWorkspace(workspaceObject);
        }

        const workspaceMap = workspaceDocument.getMap(WorkspaceMapParam);
        workspaceMap.observe(onWorkspaceApplyChanges);

        return () => {
            workspaceMap.unobserve(onWorkspaceApplyChanges);
        }
    }, [setWorkspace]);

    return (
        <WorkspaceContext.Provider
            value={{
                workspaceDocument,
                workspace,
                undoManager,
                setWorkspace: setWorkspaceYDoc,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    )
};