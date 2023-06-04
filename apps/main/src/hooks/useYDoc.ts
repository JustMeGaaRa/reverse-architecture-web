import { useOthers, useSelf, useSetPresence } from "@y-presence/react";
import { useCallback, useEffect, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

export const useYDoc = () => {
    const [ ydoc, setYDoc ] = useState<Y.Doc | null>(null);

    useEffect(() => {
        const ydoc = new Y.Doc();
        setYDoc(ydoc);

        return () => {
            ydoc.destroy();
        }
    }, []);

    return { ydoc };
}

export const useWebrtcProvider = (ydoc: Y.Doc, roomName: string) => {
    const [ provider, setProvider ] = useState<WebrtcProvider | null>(null);

    useEffect(() => {
        const provider = new WebrtcProvider(roomName, ydoc);
        setProvider(provider);

        return () => {
            provider.disconnect();
            provider.destroy();
        }
    }, [ydoc, roomName]);

    return { provider };
}

export interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
    point: { x: number, y: number };
    color: string;
    isActive: boolean;
}

export const useUserPresence = () => {
    const self = useSelf<User>();
    const others = useOthers<User>();
    const setPresence = useSetPresence<User>();

    const setSelfPoint = useCallback((point: { x: number, y: number }) => {
        if (self.presence) {
            setPresence({ ...self.presence, point });
        }
    }, [self, setPresence]);

    const setSelfStatus = useCallback((isActive: boolean) => {
        if (self.presence) {
            setPresence({ ...self.presence, isActive });
        }
    }, [self, setPresence]);

    return {
        self,
        others,
        setSelfPoint,
        setSelfStatus
    };
}