import { WorkspaceInfo } from "@structurizr/y-workspace";
import { FC, PropsWithChildren, useState } from "react"
import { WorkspaceCollectionActionOptions, WorkspaceExplorerContext, WorkspaceSelectionContext } from "../contexts"

export const WorkspaceExplorerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);

    return (
        <WorkspaceExplorerContext.Provider
            value={{
                workspaces,
                setWorkspaces,
            }}
        >
            {children}
        </WorkspaceExplorerContext.Provider>
    )
}

export const WorkspaceSelectionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ selectionModeOn, setSelectionModeOn ] = useState<boolean>(false);
    const [ selectedIds, setSelectedIds ] = useState<Array<string>>([]);
    const [ selectedOptions, setSelectedOptions ] = useState<WorkspaceCollectionActionOptions>({
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
    });
    
    return (
        <WorkspaceSelectionContext.Provider
            value={{
                selectionModeOn,
                selectedIds,
                selectedOptions,
                setSelectionModeOn,
                setSelectedIds,
                setSelectedOptions,
            }}
        >
            {children}
        </WorkspaceSelectionContext.Provider>
    )
}