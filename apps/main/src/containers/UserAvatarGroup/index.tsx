import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { FC } from "react";

export const UserAvatarGroup: FC<{ users: any[] }> = ({ users }) => {
    return (
        <AvatarGroup max={5} cursor={"pointer"}>
            {users.map(user => (
                <Avatar
                    key={user.username}
                    colorScheme={user.color}
                    name={user.fullname}
                    // src={user.avatarUrl}
                    title={user.fullname}
                />
            ))}
        </AvatarGroup>
    )
}