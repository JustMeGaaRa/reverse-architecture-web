import { Box } from "@chakra-ui/react";
import { FC } from "react";

type UserCursorProps = {
    user: { fullname: string; username: string; color: string; };
    point: { x: number; y: number; };
}

export const UserCursor: FC<UserCursorProps> = ({
    user,
    point
}) => {
    return (
        <Box
            key={user.username}
            position={"absolute"}
            backgroundColor={user.color}
            borderRadius={"full"}
            borderWidth={1}
            borderColor={"rgba(255, 255, 255, 0.1)"}
            width={"10px"}
            height={"10px"}
            title={user.fullname}
            left={point.x}
            top={point.y}
            cursor={"pointer"}
            zIndex={5}
        />
    );
}