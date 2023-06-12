import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { FC } from "react";
import { Awareness } from "y-protocols/awareness";
import { useUserPresence } from "../../hooks";

export const UserAvatarGroup: FC<{ awareness: Awareness }> = ({ awareness }) => {
    const { users } = useUserPresence(awareness);

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