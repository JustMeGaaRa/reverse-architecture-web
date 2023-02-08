import {
    Avatar,
    AvatarGroup
} from "@chakra-ui/react";
import { FC } from "react";

interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
}

type OnlineUsersProps = {
    users: Array<User>;
};

export const OnlineUsers: FC<OnlineUsersProps> = ({
    users
}) => {
    return (
        <AvatarGroup size={"sm"} max={3}>
            {users && users.map(user => (
                <Avatar
                    key={user.username}
                    name={user.fullname}
                    src={user.avatarUrl}
                />
            ))}
        </AvatarGroup>
    );
}