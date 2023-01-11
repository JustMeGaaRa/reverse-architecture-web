import { Avatar, AvatarGroup, Button, HStack } from "@chakra-ui/react";
import { FC } from "react";
import { Panel } from "./Panel";

interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
}

export type CollaborationPanelProps = {
    users: Array<User>;
};

export const CollaborationPanel: FC<CollaborationPanelProps> = ({
    users
}) => {
    return (
        <Panel dock={"top-right"}>
            <HStack
                borderRadius={"lg"}
                gap={2}
            >
                <AvatarGroup size={"sm"} max={3}>
                    {users && users.map(user => (
                        <Avatar
                            key={user.username}
                            name={user.fullname}
                            src={user.avatarUrl}
                        />
                    ))}
                </AvatarGroup>
                <Button
                >
                    Share
                </Button>
            </HStack>
        </Panel>
    )
}