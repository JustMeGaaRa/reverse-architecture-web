import { IElement } from "@structurizr/dsl";
import { useCallback, useContext } from "react";
import { WorkspaceContext } from "../contexts";

export const useWorkspace = () => {
    const {
        workspace,
        setWorkspace
    } = useContext(WorkspaceContext);

    const deleteElements = useCallback((elements: IElement[]) => {
        // TODO: what is the correct parameters here - nodes or elements?
    }, []);

    return {
        workspace,
        setWorkspace,
        deleteElements
    }
}