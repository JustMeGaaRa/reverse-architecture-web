import { useUsers } from "@y-presence/react";
import { FC } from "react";
import { Doc } from "yjs";
import { WebsocketProvider } from "y-websocket";
import { User, UserCollection } from "../../components";

export const doc = new Doc();

export const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    "y-presence-example",
    doc,
    { connect: true }
);

export const awareness = provider.awareness;

type UsersOnlineProps = unknown;

export const UsersOnline: FC<UsersOnlineProps> = () => {
    const users = useUsers<User>();
    
    return (
        <UserCollection users={users.map(x => x.presence)} />
    );
}