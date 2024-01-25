import { createContext, Dispatch, SetStateAction } from "react";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

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

export const WorkspaceCollectionContext = createContext<{
    workspaces: Array<WorkspaceInfo>;
    selectionModeOn: boolean;
    selected: Array<WorkspaceInfo | WorkspaceGroupInfo>;
    selectedOptions: WorkspaceCollectionActionOptions,
    setSelectionModeOn: Dispatch<SetStateAction<boolean>>;
    setSelected: Dispatch<SetStateAction<Array<WorkspaceInfo | WorkspaceGroupInfo>>>;
    setSelectedOptions: Dispatch<SetStateAction<WorkspaceCollectionActionOptions>>;
}>({
    workspaces: [],
    selectionModeOn: false,
    selected: [],
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
    setSelected: () => {},
    setSelectedOptions: () => {},
});