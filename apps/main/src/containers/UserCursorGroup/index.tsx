import { Box,Text } from "@chakra-ui/react";
import { useViewportUtils } from "@reversearchitecture/workspace-viewer";
import { FC } from "react";
import { Awareness } from "y-protocols/awareness";
import { useUserPresence } from "../../hooks";

export const UserCursorGroup: FC<{
    awareness: Awareness,
}> = ({ awareness }) => {
    const { others } = useUserPresence(awareness);
    const { getRenderingPoint } = useViewportUtils();

    return (
        <>
            {others.filter(x => x.point).map(user => (
                <UserCursor
                    key={user.username}
                    colorScheme={user.color}
                    point={getRenderingPoint(user.point)}
                    name={user.fullname}
                />
            ))}
        </>
    )
}

const UserCursor: FC<{
    colorScheme: string,
    point: { x: number, y: number },
    name: string,
}> = ({
    colorScheme,
    point,
    name
}) => {
    return (
        <Box
            data-group
            cursor={"pointer"}
            position={"absolute"}
            left={point.x}
            top={point.y}
            zIndex={5}
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