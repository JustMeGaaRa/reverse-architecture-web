import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WorkspaceInfo } from "../types";

export const useWorkspaceStore = create(persist<{
    workspaces: Array<WorkspaceInfo>;
    getWorkspace: (workspaceId: string) => WorkspaceInfo | undefined;
    setWorkspace: (workspace: WorkspaceInfo) => void;
    deleteWorkspace: (workspaceId: string) => void;
    clearWorkspaces: () => void;
}>(
    (set, get) => ({
        workspaces: [] as Array<WorkspaceInfo>,
        getWorkspace: (workspaceId: string) => get().workspaces.find(x => x.workspaceId === workspaceId),
        setWorkspace: (workspace: WorkspaceInfo) => set(state => ({
            ...state,
            workspaces: [...state.workspaces.filter(x => x.workspaceId !== workspace.workspaceId), workspace]
        })),
        deleteWorkspace: (workspaceId: string) => set(state => ({
            ...state,
            workspaces: state.workspaces.filter(x => x.workspaceId !== workspaceId)
        })),
        clearWorkspaces: () => set(state => ({
            ...state,
            workspaces: []
        })),
    }),
    {
        name: "workspaces-storage",
        storage: createJSONStorage(() => localStorage),
    }
))