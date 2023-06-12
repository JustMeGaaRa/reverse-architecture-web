import { useSelf, useUsers } from "y-presence";
import { Awareness } from "y-protocols/awareness";
import { useCallback, useState } from "react";

export interface User {
    username: string;
    fullname: string;
    email?: string;
    avatarUrl: string;
    point?: { x: number, y: number };
    color: string;
    isActive?: boolean;
}

export const useUserPresence = (awareness: Awareness) => {
    const self = useSelf(awareness, state => state as User);
    const others = useUsers(awareness, state => Array.from(state.entries()).filter(([id, user]) => id !== awareness.clientID).map(([, user]) => user) as User[]);
    const users = useUsers(awareness, state => Array.from(state.entries()).map(([, user]) => user) as User[]);

    return {
        self,
        others,
        users
    };
}

export const useSelfPresence = () => {
    const [ self, setSelf ] = useState<User>();

    const setSelfPoint = useCallback((awareness: Awareness, point: { x: number, y: number }) => {
        if (awareness) {
            awareness.setLocalState({ ...self, point });
            setSelf({ ...self, point });
        }
    }, [self]);

    const setSelfPresence = useCallback((awareness: Awareness, user: User) => {
        if (awareness) {
            awareness.setLocalState(user);
            setSelf(user);
        }
    }, []);

    return {
        setSelfPresence,
        setSelfPoint
    };
}