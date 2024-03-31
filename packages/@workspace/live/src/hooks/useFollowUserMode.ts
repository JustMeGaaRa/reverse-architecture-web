import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";
import { UserInfo } from "../types";

export const useFollowUserMode = () => {
    const { currentUser, setCurrentUser } = useContext(WorkspaceRoomContext);

    const followUser = useCallback((userInfo: UserInfo) => {
        setCurrentUser(state => ({ ...state, following: userInfo }));
    }, [setCurrentUser]);

    const unfollowUser = useCallback(() => {
        setCurrentUser(state => ({ ...state, following: undefined }));
    }, [setCurrentUser]);

    return {
        followingUser: currentUser.following,
        followUser,
        unfollowUser,
    }
}