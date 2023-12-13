import { Box,Text } from "@chakra-ui/react";
import { WorkspaceElementPortal, WorkspaceViewportRelativerWrapper } from "@workspace/core";
import { User } from "@workspace/live";
import { FC } from "react";

const UserCursor: FC<{
    colorScheme: string,
    name: string,
}> = ({
    colorScheme,
    name
}) => {
    return (
        <Box data-group cursor={"pointer"}>
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
                color={"white"}
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

export const UserCursorGroup: FC<{ users: Array<User> }> = ({ users }) => {
    return (
        <WorkspaceElementPortal>
            <Box
                className={"workspace__user-group"}
                position={"absolute"}
                top={0}
                left={0}
                height={"100%"}
                width={"100%"}
            >
                {users.filter(x => x?.position).map(user => (
                    <WorkspaceViewportRelativerWrapper
                        key={user.username}
                        position={user.position}
                    >
                        <UserCursor
                            colorScheme={user.color}
                            name={user.fullname}
                        />
                    </WorkspaceViewportRelativerWrapper>
                ))}
            </Box>
        </WorkspaceElementPortal>
    )
}