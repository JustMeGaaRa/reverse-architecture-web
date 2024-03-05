import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { UserInfo } from "@workspace/react";
import { FC } from "react";

export const UserAvatarGroup: FC<{
    users: UserInfo[];
    onAvatarClick?: (user: UserInfo) => void;
}> = ({
    users,
    onAvatarClick
}) => {
    return (
        <AvatarGroup max={5} cursor={"pointer"}>
            {users.map(user => (
                <Avatar
                    key={user.username}
                    colorScheme={user.color}
                    name={user.fullname}
                    title={user.fullname}
                    onClick={() => onAvatarClick?.(user)}
                />
            ))}
        </AvatarGroup>
    )
}