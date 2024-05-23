import { IWorkspaceInfo } from "@structurizr/y-workspace";
import { useCallback, useContext } from "react";
import { WorkspaceExplorerContext, WorkspaceSelectionContext } from "../contexts";

export const useWorkspaceSelection = () => {
    const {
        workspaces
    } = useContext(WorkspaceExplorerContext);
    const {
        selectionModeOn,
        selectedIds,
        setSelectionModeOn,
        setSelectedIds,
        setSelectedOptions
    } = useContext(WorkspaceSelectionContext);

    const updateSelectionOptions = useCallback((selectedIds: Array<string>, workspaces: Array<IWorkspaceInfo>) => {
        const hasAnySelected = selectedIds.length > 0;
        const hasSelectedArchived = selectedIds.some(selectedId => {
            return workspaces.some(workspace => {
                return workspace.workspaceId === selectedId
                    && workspace.status === "archived";
            })
        });
        const hasSelectedGroup = selectedIds.some(selectedId => {
            return workspaces.some(workspace => {
                return workspace.workspaceId !== selectedId
                    && workspace.group === selectedId;
            })
        });
        const hasSelectedWorkspaces = selectedIds.some(selectedId => {
            return workspaces.some(workspace => {
                return workspace.workspaceId === selectedId
                    && workspace.group == undefined;
            })
        });
        const onlySelectedGroups = hasSelectedGroup && !hasSelectedWorkspaces;
        const onlySelectedWorkspaces = !hasSelectedGroup && hasSelectedWorkspaces;
        const hasSelectedBoth = hasSelectedWorkspaces && hasSelectedGroup;
        const hasSelectedSingle = onlySelectedGroups || onlySelectedWorkspaces;

        setSelectedOptions(selectedOptions => ({
            ...selectedOptions,
            stack: {
                ...selectedOptions.stack,
                isVisible: true,
                isEnabled: onlySelectedWorkspaces
            },
            unstack: {
                ...selectedOptions.unstack,
                isVisible: onlySelectedGroups,
                isEnabled: onlySelectedGroups
            },
            remove: {
                ...selectedOptions.remove,
                isVisible: true,
                isEnabled: hasAnySelected
            },
            clone: {
                ...selectedOptions.clone,
                isVisible: true,
                isEnabled: onlySelectedWorkspaces
            },
            archive: {
                ...selectedOptions.archive,
                isVisible: !hasSelectedArchived && onlySelectedWorkspaces,
                isEnabled: !hasSelectedArchived && onlySelectedWorkspaces
            },
            unarchive: {
                ...selectedOptions.unarchive,
                isVisible: hasSelectedArchived,
                isEnabled: hasSelectedArchived
            }
        }));
    }, [setSelectedOptions]);

    const addSelected = useCallback((selectedId: string) => {
        setSelectedIds(selectedIds => {
            const updatedSelectedIds = ([ ...selectedIds, selectedId ]);
            updateSelectionOptions(updatedSelectedIds, workspaces);
            return updatedSelectedIds;
        });
    }, [setSelectedIds, updateSelectionOptions, workspaces]);

    const removeSelected = useCallback((selectedId: string) => {
        setSelectedIds(selectedIds => {
            const updatedSelectedIds = selectedIds.filter(currentId => currentId !== selectedId);
            updateSelectionOptions(updatedSelectedIds, workspaces);
            return updatedSelectedIds;
        });
    }, [setSelectedIds, updateSelectionOptions, workspaces]);

    const toggleSelected = useCallback((selectedId: string) => {
        setSelectedIds(selectedIds => {
            const updatedSelectedIds = selectedIds.some(currentId => currentId === selectedId)
                ? selectedIds.filter(currentId => currentId !== selectedId)
                : [ ...selectedIds, selectedId ];;
            updateSelectionOptions(updatedSelectedIds, workspaces);
            return updatedSelectedIds;
        });
    }, [setSelectedIds, updateSelectionOptions, workspaces]);

    const clearSelected = useCallback(() => {
        setSelectedIds([]);
        updateSelectionOptions([], workspaces);
        // setSelectionModeOn(false);
    }, [setSelectedIds, updateSelectionOptions, workspaces]);

    return {
        selectionModeOn,
        selectedIds,
        setSelectionModeOn,
        addSelected,
        removeSelected,
        toggleSelected,
        clearSelected,
    }
}