import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { FC } from "react";

export interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
    point: { x: number, y: number };
    color: string;
    isActive: boolean;
}

export const UserCollection: FC<{
    users: Array<User>;
}> = ({
    users
}) => {
    return (
        <AvatarGroup size={"sm"} max={3} colorScheme={"purple"}>
            {users.map(user => (
                <Avatar
                    key={user.username}
                    name={user.username}
                    cursor={"pointer"}
                    title={user.fullname}
                />
            ))}
        </AvatarGroup>
    );
}