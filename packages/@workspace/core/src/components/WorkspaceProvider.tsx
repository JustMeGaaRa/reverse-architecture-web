import { IWorkspace, Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from "react";
import * as Y from "yjs";
import { WorkspaceContext } from "../contexts";

const WorkspaceMapParam = "workspace";
const workspaceDocument = new Y.Doc();

export const WorkspaceProvider: FC<PropsWithChildren<{
    initialWorkspace?: IWorkspace;
}>> = ({
    children,
    initialWorkspace
}) => {
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());
    const [ undoManager, setUndoManager ] = useState<Y.UndoManager>();

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
    }, [setWorkspace]);

    useEffect(() => {
        // NOTE: initialize workspace document for initial state, before initializing undo manager
        setWorkspaceYDoc(initialWorkspace ?? Workspace.Empty.toObject());
        const undoManager = new Y.UndoManager(workspaceDocument.getMap(WorkspaceMapParam));
        setUndoManager(undoManager);
    }, [initialWorkspace, setWorkspaceYDoc]);

    useEffect(() => {
        const onWorkspaceApplyRemoteChanges = () => {
            // NOTE: apply any changes to the documents (undo/redo and remote changes support)
            const workspaceJson = workspaceMap.get(WorkspaceMapParam) as string;
            const workspaceObject = JSON.parse(workspaceJson) as IWorkspace;
            setWorkspace(workspaceObject);

            // TODO: set structurizr text
            // const structurizrText = workspaceMap.get("structurizr") as string;
            // const structurizrExporter = new StructurizrExportClient();
            // setStructurizrText(structurizrText);
        }

        const workspaceMap = workspaceDocument.getMap(WorkspaceMapParam);
        workspaceMap.observe(onWorkspaceApplyRemoteChanges);

        return () => {
            workspaceMap.unobserve(onWorkspaceApplyRemoteChanges);
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