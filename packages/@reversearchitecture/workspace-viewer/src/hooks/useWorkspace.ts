import {
    IElement,
    IWorkspace,
    Position,
    ViewKeys
} from "@structurizr/dsl";
import { useCallback } from "react";
import { useWorkspaceStore } from "../hooks";
import { getView } from "../utils";

export const useWorkspace = () => {
    const { workspace } = useWorkspaceStore();
    
    const setWorkspace = useCallback((workspace: IWorkspace) => {
        useWorkspaceStore.setState(state => ({
            ...state,
            workspace,
            selectedView: getView(workspace)
        }));
    }, []);

    const setSelectedView = useCallback((view: ViewKeys) => {
        useWorkspaceStore.setState(state => ({
            ...state,
            selectedView: getView(workspace, view)
        }));
    }, [workspace]);

    const addElements = useCallback((element: IElement, position: Position, parentId?: string) => {

    }, []);

    const deleteElements = useCallback((elements: IElement[]) => {
        // TODO: what is the correct parameters here - nodes or elements?
    }, []);

    return {
        setWorkspace,
        setSelectedView,
        addElements,
        deleteElements
    }
}