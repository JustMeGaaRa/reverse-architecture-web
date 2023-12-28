import { useCallback, useContext, useEffect } from "react";
import { WorkspaceCollectionContext } from "../contexts";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { isWorkspace, isWorkspaceGroup } from "../utils";

export const useWorkspaceCollection = () => {
    const {
        selectionModeOn,
        selected,
        setSelectionModeOn,
        setSelected,
        setSelectedOptions
    } = useContext(WorkspaceCollectionContext);

    useEffect(() => {
        const selectedBoth = (selected.some(x => isWorkspace(x)) && selected.some(x => isWorkspaceGroup(x)));
        setSelectedOptions(options => {
            return {
                ...options,
                stack: {
                    ...options.stack,
                    isAllowed: !selectedBoth,
                },
                unstack: {
                    ...options.unstack,
                    isAllowed: !selectedBoth,
                },
                delete: {
                    ...options.delete,
                    isAllowed: selected.length > 0,
                },
                clone: {
                    ...options.clone,
                    isAllowed: !selectedBoth,
                },
            }
        });
    }, [selected, setSelectedOptions]);

    const addSelected = useCallback((workspace: WorkspaceInfo | WorkspaceGroupInfo) => {
        setSelected(workspaces => {
            if (isWorkspace(workspace)) {
                return [
                    ...workspaces.filter(x => {
                        return isWorkspace(x)
                            ? x.workspaceId !== workspace.workspaceId
                            : true;
                    }),
                    workspace
                ];
            }
            if (isWorkspaceGroup(workspace)) {
                return [
                    ...workspaces.filter(x => {
                        return isWorkspaceGroup(x)
                            ? x.name !== workspace.name
                            : true;
                    }),
                    workspace
                ];
            }
        });
    }, [setSelected]);

    const removeSelected = useCallback((workspace: WorkspaceInfo | WorkspaceGroupInfo) => {
        setSelected(workspaces => {
            if (isWorkspace(workspace)) {
                return workspaces.filter(x => {
                    return isWorkspace(x)
                        ? x.workspaceId !== workspace.workspaceId
                        : true;
                })
            }
            if (isWorkspaceGroup(workspace)) {
                return workspaces.filter(x => {
                    return isWorkspaceGroup(x)
                        ? x.name !== workspace.name
                        : true;
                })
            }
        });
    }, [setSelected]);

    const toggleSelected = useCallback((workspace: WorkspaceInfo | WorkspaceGroupInfo) => {
        if (isWorkspace(workspace)) {
            selected.some(x => isWorkspace(x) && x.workspaceId === workspace.workspaceId)
                ? removeSelected(workspace)
                : addSelected(workspace);
        }
        if (isWorkspaceGroup(workspace)) {
            selected.some(x => isWorkspaceGroup(x) && x.name === workspace.name)
                ? removeSelected(workspace)
                : addSelected(workspace);
        }
    }, [selected, removeSelected, addSelected]);

    const clearSelected = useCallback(() => {
        setSelected([]);
        setSelectionModeOn(false);
    }, [setSelected, setSelectionModeOn]);

    return {
        selectionModeOn: selectionModeOn,
        selected: selected,
        setSelectionModeOn,
        addSelected,
        removeSelected,
        toggleSelected,
        clearSelected,
    }
}