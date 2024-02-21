import { useCallback, useContext } from "react";
import { WorkspaceCollectionContext } from "../contexts";

export const useWorkspaceSelection = () => {
    const {
        selectionModeOn,
        selectedIds,
        setSelectionModeOn,
        setSelectedIds
    } = useContext(WorkspaceCollectionContext);

    const addSelected = useCallback((selectedId: string) => {
        setSelectedIds(selectedIds => ([ ...selectedIds, selectedId ]));
    }, [setSelectedIds]);

    const removeSelected = useCallback((selectedId: string) => {
        setSelectedIds(selectedIds => selectedIds.filter(currentId => currentId !== selectedId));
    }, [setSelectedIds]);

    const toggleSelected = useCallback((selectedId: string) => {
        setSelectedIds(selectedIds => {
            return selectedIds.some(currentId => currentId === selectedId)
                ? selectedIds.filter(currentId => currentId !== selectedId)
                : [ ...selectedIds, selectedId ];
        });
    }, [setSelectedIds]);

    const clearSelected = useCallback(() => {
        setSelectedIds([]);
        // setSelectionModeOn(false);
    }, [setSelectedIds]);

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