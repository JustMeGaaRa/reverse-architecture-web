import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WorkspaceCollectionActionOptions } from "../contexts";
import { WorkspaceInfo } from "../types";

export const useWorkspaceStore = create(persist<{
    workspaces: Array<WorkspaceInfo>;
    archived: Array<WorkspaceInfo>;
    getWorkspace: (workspaceId: string) => WorkspaceInfo | undefined;
    setWorkspaces: (workspaces: React.SetStateAction<Array<WorkspaceInfo>>) => void;
    setArchived: (workspaces: React.SetStateAction<Array<WorkspaceInfo>>) => void;
    clearWorkspaces: () => void;
    clearArchived: () => void;

    selectedIds: Array<string>;
    selectedOptions: WorkspaceCollectionActionOptions;
    setSelectedIds: Dispatch<SetStateAction<Array<string>>>;
    setSelectedOptions: Dispatch<SetStateAction<WorkspaceCollectionActionOptions>>;

    bookmarkedIds: Array<string>;
    likedIds: Array<string>;
    setBookmarkedIds: Dispatch<SetStateAction<Array<string>>>;
    setLikedIds: Dispatch<SetStateAction<Array<string>>>;
}>(
    (set, get) => ({
        workspaces: [] as Array<WorkspaceInfo>,
        archived: [] as Array<WorkspaceInfo>,
        getWorkspace: (workspaceId: string) => {
            return get().workspaces.find(x => x.workspaceId === workspaceId)
                ?? get().archived.find(x => x.workspaceId === workspaceId);
        },
        setWorkspaces: (workspaces: React.SetStateAction<Array<WorkspaceInfo>>) => set(state => ({
            ...state,
            workspaces: workspaces instanceof Function
                ? workspaces(state.workspaces)
                : workspaces
        })),
        setArchived: (workspaces: React.SetStateAction<Array<WorkspaceInfo>>) => set(state => ({
            ...state,
            archived: workspaces instanceof Function
                ? workspaces(state.archived)
                : workspaces
        })),
        clearWorkspaces: () => set(state => ({ ...state, workspaces: [] })),
        clearArchived: () => set(state => ({ ...state, archived: [] })),
        
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
        setSelectedIds: (stateAction: React.SetStateAction<Array<string>>) => set(state => {
            const selectedIds = stateAction instanceof Function
                ? stateAction(state.selectedIds)
                : stateAction;
            
            const hasAnySelected = selectedIds.length > 0;
            const hasSelectedArchived = selectedIds.some(selectedId => {
                return state.archived.some(workspace => {
                    return workspace.workspaceId === selectedId;
                })
            });
            const hasSelectedGroup = selectedIds.some(selectedId => {
                return state.workspaces.some(workspace => {
                    return workspace.workspaceId !== selectedId
                        && workspace.group === selectedId;
                })
            });
            const hasSelectedWorkspaces = selectedIds.some(selectedId => {
                return state.workspaces.some(workspace => {
                    return workspace.workspaceId === selectedId
                        && workspace.group == undefined;
                })
            });
            const onlySelectedGroups = hasSelectedGroup && !hasSelectedWorkspaces;
            const onlySelectedWorkspaces = !hasSelectedGroup && hasSelectedWorkspaces;
            const hasSelectedBoth = hasSelectedWorkspaces && hasSelectedGroup;
            const hasSelectedSingle = onlySelectedGroups || onlySelectedWorkspaces;

            return ({
                ...state,
                selectedIds: selectedIds,
                selectedOptions: {
                    ...state.selectedOptions,
                    stack: {
                        ...state.selectedOptions.stack,
                        isVisible: true,
                        isEnabled: onlySelectedWorkspaces
                    },
                    unstack: {
                        ...state.selectedOptions.unstack,
                        isVisible: true,
                        isEnabled: onlySelectedGroups
                    },
                    remove: {
                        ...state.selectedOptions.remove,
                        isVisible: true,
                        isEnabled: hasAnySelected
                    },
                    clone: {
                        ...state.selectedOptions.clone,
                        isVisible: true,
                        isEnabled: onlySelectedWorkspaces
                    },
                    archive: {
                        ...state.selectedOptions.archive,
                        isVisible: true,
                        isEnabled: !hasSelectedArchived && onlySelectedWorkspaces
                    },
                    unarchive: {
                        ...state.selectedOptions.unarchive,
                        isVisible: true,
                        isEnabled: hasSelectedArchived
                    },
                }
            })
        }),
        setSelectedOptions: (stateAction: React.SetStateAction<WorkspaceCollectionActionOptions>) => set(state => ({
            ...state,
            selectedOptions: stateAction instanceof Function
                ? stateAction(state.selectedOptions)
                : stateAction
        })),

        bookmarkedIds: [],
        likedIds: [],
        setBookmarkedIds: (stateAction: React.SetStateAction<Array<string>>) => set(state => ({
            ...state,
            bookmarkedIds: stateAction instanceof Function
                ? stateAction(state.bookmarkedIds)
                : stateAction
        })),
        setLikedIds: (stateAction: React.SetStateAction<Array<string>>) => set(state => ({
            ...state,
            likedIds: stateAction instanceof Function
                ? stateAction(state.likedIds)
                : stateAction
        })),
    }),
    {
        name: "workspaces-storage",
        storage: createJSONStorage(() => localStorage),
    }
));