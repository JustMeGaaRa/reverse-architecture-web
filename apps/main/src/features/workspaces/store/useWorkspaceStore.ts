import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WorkspaceInfo } from "../types";

export const useWorkspaceStore = create(persist<{
    workspaces: Array<WorkspaceInfo>;
    archived: Array<WorkspaceInfo>;
    getWorkspace: (workspaceId: string) => WorkspaceInfo | undefined;
    setWorkspaces: (workspaces: React.SetStateAction<Array<WorkspaceInfo>>) => void;
    setArchived: (workspaces: React.SetStateAction<Array<WorkspaceInfo>>) => void;
    clearWorkspaces: () => void;
    clearArchived: () => void;

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