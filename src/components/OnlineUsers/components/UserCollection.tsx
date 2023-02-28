import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "../types";

type UserCollectionProps = {
    users: Array<User>;
};

export const UserCollection: FC<UserCollectionProps> = ({
    users
}) => {
    return (
        <AvatarGroup size={"sm"} max={3}>
            {users && users.map(user => (
                <Avatar
                    key={user.username}
                    bgColor={user.color}
                    name={user.fullname}
                    src={user.avatarUrl}
                    title={user.fullname}
                />
            ))}
        </AvatarGroup>
    );
}