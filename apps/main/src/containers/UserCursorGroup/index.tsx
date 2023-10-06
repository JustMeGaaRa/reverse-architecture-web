import { Box,Text } from "@chakra-ui/react";
import { ForeignElement } from "@workspace/core";
import { FC } from "react";

export const UserCursorGroup: FC<{ users: Array<any> }> = ({ users }) => {
    return (
        <>
            {users.filter(x => x.point).map(user => (
                <ForeignElement
                    key={user.username}
                    position={user.point}
                >
                    <UserCursor
                        colorScheme={user.color}
                        name={user.fullname}
                    />
                </ForeignElement>
            ))}
        </>
    )
}

const UserCursor: FC<{
    colorScheme: string,
    name: string,
}> = ({
    colorScheme,
    name
}) => {
    return (
        <Box
            data-group
            cursor={"pointer"}
        >
            <Box
                backgroundColor={`${colorScheme}.900`}
                borderRadius={"full"}
                transform={"translate(-50%, -50%)"}
                height={5}
                width={5}
            />
            <Text
                backgroundColor={`${colorScheme}.900`}
                borderRadius={"full"}
                color={"basic.white"}
                display={"none"}
                fontSize={14}
                position={"absolute"}
                paddingX={2}
                top={"15px"}
                left={"15px"}
                width={"max-content"}
                _groupHover={{ display: "inline-block" }}
            >
                {name}
            </Text>
        </Box>
    )
}