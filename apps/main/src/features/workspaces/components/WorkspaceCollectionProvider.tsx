import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceCollectionActionOptions, WorkspaceCollectionContext } from "../contexts";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";

export const WorkspaceCollectionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ selected, setSelected ] = useState<Array<WorkspaceInfo | WorkspaceGroupInfo>>([]);
    const [ selectionModeOn, setSelectionModeOn ] = useState(false);
    const [ selectedOptions, setSelectedOptions ] = useState<WorkspaceCollectionActionOptions>({
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
    });

    return (
        <WorkspaceCollectionContext.Provider
            value={{
                selectionModeOn,
                selected,
                selectedOptions,
                setSelectionModeOn,
                setSelected,
                setSelectedOptions
            }}
        >
            {children}
        </WorkspaceCollectionContext.Provider>
    )
}