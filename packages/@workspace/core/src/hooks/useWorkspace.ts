import { IElement } from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceContext } from "../contexts";

export const useWorkspace = () => {
    const {
        workspaceDocument,
        workspace,
        undoManager,
        setWorkspace
    } = useContext(WorkspaceContext);

    const deleteElements = useCallback((elements: IElement[]) => {
        // TODO: what is the correct parameters here - nodes or elements?
    }, []);

    return {
        workspaceDocument,
        workspace,
        undoManager,
        setWorkspace,
        deleteElements
    }
}