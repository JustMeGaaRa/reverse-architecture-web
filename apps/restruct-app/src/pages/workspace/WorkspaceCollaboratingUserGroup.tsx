import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { useFollowUserMode, UserInfo, useWorkspaceRoom } from "@workspace/live";
import { FC, useCallback, useMemo } from "react";

export const WorkspaceCollaboratingUserGroup: FC = () => {
    const { currentUser, collaboratingUsers } = useWorkspaceRoom();
    const { followUser } = useFollowUserMode();

    const users = useMemo(() => {
        return [currentUser, ...collaboratingUsers].map(user => user.info);
    }, [currentUser, collaboratingUsers]);

    const handleOnAvatarClick = useCallback((user: UserInfo) => {
        followUser(user);
    }, [followUser]);
    
    return (
        <AvatarGroup max={5} cursor={"pointer"}>
            {users.map(user => (
                <Avatar
                    key={user.username}
                    colorScheme={user.color}
                    name={user.fullname}
                    title={user.fullname}
                    onClick={() => handleOnAvatarClick(user)}
                />
            ))}
        </AvatarGroup>
    )
}