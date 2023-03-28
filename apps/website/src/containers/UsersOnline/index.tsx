import { HStack } from "@chakra-ui/react";
import { useUsers } from "@y-presence/react";
import { FC } from "react";
import { User, UserCollection } from "../../components";

type UsersOnlineProps = unknown;

export const UsersOnline: FC<UsersOnlineProps> = () => {
    const users = useUsers<User>();
    
    return (
        <HStack px={2}>
            <UserCollection users={users.map(x => x.presence)} />
        </HStack>
    );
}
