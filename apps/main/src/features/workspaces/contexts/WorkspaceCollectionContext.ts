import { createContext, Dispatch, SetStateAction } from "react";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

export type ActionOptions = {
    isEnabled: boolean;
    isAllowed: boolean;
};

export type WorkspaceCollectionActionOptions = {
    stack: ActionOptions;
    unstack: ActionOptions;
    delete: ActionOptions;
    clone: ActionOptions;
};

export const WorkspaceCollectionContext = createContext<{
    selectionModeOn: boolean;
    selected: Array<WorkspaceInfo | WorkspaceGroupInfo>;
    selectedOptions: WorkspaceCollectionActionOptions,
    setSelectionModeOn: Dispatch<SetStateAction<boolean>>;
    setSelected: Dispatch<SetStateAction<Array<WorkspaceInfo | WorkspaceGroupInfo>>>;
    setSelectedOptions: Dispatch<SetStateAction<WorkspaceCollectionActionOptions>>;
}>({
    selectionModeOn: false,
    selected: [],
    selectedOptions: {
        stack: {
            isEnabled: false,
            isAllowed: false,
        },
        unstack: {
            isEnabled: false,
            isAllowed: false,
        },
        delete: {
            isEnabled: false,
            isAllowed: false,
        },
        clone: {
            isEnabled: false,
            isAllowed: false,
        },
    },
    setSelectionModeOn: () => {},
    setSelected: () => {},
    setSelectedOptions: () => {},
});