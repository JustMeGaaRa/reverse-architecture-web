import { FC } from "react";
import {
    Avatar,
    AvatarGroup,
    Button,
    HStack,
} from "@chakra-ui/react";
import { Panel, PanelProps } from "./Panel";

interface User {
    username: string;
    fullname: string;
    avatarUrl: string;
}

export type CollaborationPanelProps = Partial<Pick<PanelProps, "dock">> & {
    users: Array<User>;
};

export const CollaborationPanel: FC<CollaborationPanelProps> = ({
    dock,
    users
}) => {
    return (
        <Panel dock={dock ?? "top-right"} px={4} py={2}>
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
                <Button>
                    Share
                </Button>
            </HStack>
        </Panel>
    );
}