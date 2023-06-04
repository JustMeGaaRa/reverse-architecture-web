import { create } from "zustand";

export const useOnlineUsersStore = create<{
    users: any[],
    setUsers: (users: any[]) => void,
}>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));