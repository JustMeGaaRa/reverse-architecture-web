import { useSelf, useUsers } from "y-presence";
import { Awareness } from "y-protocols/awareness";
import { useCallback } from "react";

export interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
    point: { x: number, y: number };
    color: string;
    isActive: boolean;
}

export const useUserPresence = (awareness: Awareness) => {
    const self = useSelf(awareness, state => state as User);
    const others = useUsers(awareness, state => Array.from(state.entries()).filter(([id, user]) => id !== awareness.clientID).map(([, user]) => user) as User[]);
    const users = useUsers(awareness, state => Array.from(state.entries()).map(([, user]) => user) as User[]);

    const setSelfPresence = useCallback((user: User) => {
        if (awareness) {
            awareness.setLocalState(user);
        }
    }, [awareness]);

    return {
        self,
        others,
        users,
        setSelfPresence
    };
}