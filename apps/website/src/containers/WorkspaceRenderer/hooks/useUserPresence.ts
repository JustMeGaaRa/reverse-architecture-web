import { useOthers, useSelf, useSetPresence } from "@y-presence/react";
import { useCallback } from "react";
import { User } from "../../../components";

export const useUserPresence = () => {
    const self = useSelf<User>();
    const others = useOthers<User>();
    const setPresence = useSetPresence<User>();

    const setSelfPoint = useCallback((point: { x: number, y: number }) => {
        if (self.presence) {
            setPresence({
                ...self.presence,
                point,
            });
        }
    }, [self, setPresence]);

    const setSelfStatus = useCallback((isActive: boolean) => {
        if (self.presence) {
            setPresence({
                ...self.presence,
                isActive,
            });
        }
    }, [self, setPresence]);

    return {
        self,
        others,
        setSelfPoint,
        setSelfStatus
    };
}