import { Avatar } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "../types";

type UserCursorProps = {
    user: User;
    position: { x: number; y: number };
}

export const UserCursor: FC<UserCursorProps> = ({
    user,
    position
}) => {
    return (
        <Avatar
            key={user.username}
            bgColor={user.color}
            name={user.fullname}
            src={user.avatarUrl}
            title={user.fullname}
        />
    );
}