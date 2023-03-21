import { useUsers } from "@y-presence/react";
import { FC } from "react";
import { User, UserCollection } from "../../components";

type UsersOnlineProps = unknown;

export const UsersOnline: FC<UsersOnlineProps> = () => {
    const users = useUsers<User>();
    
    return (
        <UserCollection users={users.map(x => x.presence)} />
    );
}
