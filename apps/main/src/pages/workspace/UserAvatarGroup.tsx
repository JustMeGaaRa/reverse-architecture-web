import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { UserInfo } from "@workspace/core";
import { FC } from "react";

export const UserAvatarGroup: FC<{ users: UserInfo[] }> = ({ users }) => {
    return (
        <AvatarGroup max={5} cursor={"pointer"}>
            {users.map(user => (
                <Avatar
                    key={user.username}
                    colorScheme={user.color}
                    name={user.fullname}
                    title={user.fullname}
                />
            ))}
        </AvatarGroup>
    )
}