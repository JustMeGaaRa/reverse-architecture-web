import { IWorkspace, Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from "react";
import * as Y from "yjs";
import { Transaction, YMapEvent } from "yjs";
import { WorkspaceContext } from "../contexts";

export const workspaceDocument = new Y.Doc();
export const undoManager = new Y.UndoManager(workspaceDocument.getMap("workspace"));

export const WorkspaceProvider: FC<PropsWithChildren<{
    initialWorkspace?: IWorkspace;
}>> = ({
    children,
    initialWorkspace
}) => {
    const [ workspace, setWorkspace ] = useState<IWorkspace>(Workspace.Empty.toObject());

    useEffect(() => setWorkspace(initialWorkspace ?? Workspace.Empty.toObject()), [initialWorkspace]);

    useEffect(() => {
        const onWorkspaceApplyRemoteChanges = (event: YMapEvent<unknown>, transaction: Transaction) => {
            // NOTE: apply local changes as well to support undo/redo feature
            const workspaceJson = workspaceMap.get("workspace") as string;
            setWorkspace(JSON.parse(workspaceJson) as IWorkspace);

            // TODO: set structurizr text
            // const structurizrText = workspaceMap.get("structurizr") as string;
            // const structurizrExporter = new StructurizrExportClient();
            // setStructurizrText(structurizrText);
        }

        const workspaceMap = workspaceDocument.getMap("workspace");
        workspaceMap.observe(onWorkspaceApplyRemoteChanges);

        return () => {
            workspaceMap.unobserve(onWorkspaceApplyRemoteChanges);
        }
    }, [setWorkspace]);

    const onWorkspacePublishLocalChanges = useCallback((action: SetStateAction<IWorkspace>) => {
        setWorkspace(prevState => {
            const newState = typeof action === "function" ? action(prevState) : action;

            const workspaceMap = workspaceDocument.getMap("workspace");
            workspaceMap.set("workspace", JSON.stringify(newState));

            return newState;
        });
    }, [setWorkspace]);

    return (
        <WorkspaceContext.Provider
            value={{
                workspaceDocument,
                workspace,
                undoManager,
                setWorkspace: onWorkspacePublishLocalChanges,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    )
};