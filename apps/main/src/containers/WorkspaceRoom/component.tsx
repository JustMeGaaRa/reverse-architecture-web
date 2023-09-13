import {
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { Awareness } from "y-protocols/awareness";
import { WorkspaceRoomContext } from "./context";
import {
    useWorkspaceRoomStore,
    useWorkspaceRoom,
    useAwarenessEffect
} from "./hooks";
import { Account } from "./types";

export const WorkspaceRoom: FC<PropsWithChildren<{
    roomId: string;
    onChange?: (users: Array<Account>) => void;
}>> = ({
    children,
    roomId,
    onChange
}) => {
    const { ydoc, provider, setYDoc, setProvider, setUsers } = useWorkspaceRoomStore();

    const onAwarenessChange = useCallback((awareness: Awareness) => {
        const users = Array
            .from(awareness.states.entries() ?? [])
            .map(([, value]) => value.account as Account);

        setUsers(users);
        onChange?.(users);
    }, [setUsers, onChange]);

    useAwarenessEffect(
        provider?.awareness,
        {
            onChange: onAwarenessChange,
            onUpdate: onAwarenessChange
        }
    );

    useEffect(() => {
        if (roomId && !ydoc && !provider) {
            const ydocNew = new Y.Doc();
            const providerNew = new WebrtcProvider(roomId, ydocNew);
            setYDoc(ydocNew);
            setProvider(providerNew);
        }

        return () => {
            ydoc?.destroy();
            provider?.disconnect();
            provider?.destroy();
        }
    }, [roomId, ydoc, provider, setYDoc, setProvider]);

    return (
        <>
            {children}
        </>
    )
}

export const WorkspaceRoomProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ ydoc, setYDoc ] = useState<Y.Doc>();
    const [ provider, setProvider ] = useState<WebrtcProvider>();
    const [ users, setUsers ] = useState<Array<Account>>([]);

    return (
        <WorkspaceRoomContext.Provider
            value={{
                ydoc,
                provider,
                users,
                setYDoc,
                setProvider,
                setUsers,
            }}
        >
            {children}
        </WorkspaceRoomContext.Provider>
    )
}

export const WorkspaceUser: FC<{ account: Account }> = ({ account }) => {
    const { joinRoom, leaveRoom } = useWorkspaceRoom();

    useEffect(() => {
        if (account) {
            joinRoom(account);
        }

        return () => {
            if (account) {
                leaveRoom();
            }
        }
    }, [account, joinRoom, leaveRoom]);

    return null;
}