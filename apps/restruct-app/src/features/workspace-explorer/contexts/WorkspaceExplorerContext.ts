import { IWorkspaceInfo } from "@structurizr/y-workspace";
import { createContext, Dispatch, SetStateAction } from "react";

export type ActionOptions = {
    isEnabled: boolean;
    isVisible: boolean;
};

export type WorkspaceCollectionActionOptions = {
    stack: ActionOptions;
    unstack: ActionOptions;
    remove: ActionOptions;
    clone: ActionOptions;
    archive: ActionOptions;
    unarchive: ActionOptions;
};

export const WorkspaceExplorerContext = createContext<{
    workspaces: Array<IWorkspaceInfo>;
    setWorkspaces: Dispatch<SetStateAction<Array<IWorkspaceInfo>>>;
}>({
    workspaces: [],
    setWorkspaces: () => { console.debug("Workspace Explorer Context: dummy setWorkspaces") },
});

export const WorkspaceSelectionContext = createContext<{
    selectionModeOn: boolean;
    selectedIds: Array<string>;
    selectedOptions: WorkspaceCollectionActionOptions;
    setSelectionModeOn: Dispatch<SetStateAction<boolean>>;
    setSelectedIds: Dispatch<SetStateAction<Array<string>>>;
    setSelectedOptions: Dispatch<SetStateAction<WorkspaceCollectionActionOptions>>;
}>({
    selectionModeOn: false,
    selectedIds: [],
    selectedOptions: {
        stack: {
            isEnabled: false,
            isVisible: false,
        },
        unstack: {
            isEnabled: false,
            isVisible: false,
        },
        remove: {
            isEnabled: false,
            isVisible: false,
        },
        clone: {
            isEnabled: false,
            isVisible: false,
        },
        archive: {
            isEnabled: false,
            isVisible: false,
        },
        unarchive: {
            isEnabled: false,
            isVisible: false,
        },
    },
    setSelectionModeOn: () => {},
    setSelectedIds: () => {},
    setSelectedOptions: () => {},
})