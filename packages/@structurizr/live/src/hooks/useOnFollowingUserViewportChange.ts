import { Viewport } from "@structurizr/react";
import { useYjsCollaborative } from "@yjs/react";
import { useContext, useEffect } from "react";
import { WorkspaceRoomContext } from "../contexts";
import { UserAwarenessViewportParam } from "../types";

type FollowUserCallbacks = {
    onChange?: (viewport: Viewport) => void;
}

export const useOnFollowingUserViewportChange = (callbacks: FollowUserCallbacks) => {
    const { currentUser, presentation } = useContext(WorkspaceRoomContext);
    const { document } = useYjsCollaborative();
    const { onChange } = callbacks;

    useEffect(() => {
        if (currentUser.following !== null && currentUser.following !== undefined) {
            const onFollowingUserViewportChanged = () => {
                // NOTE: only call onChange if the user is following someone
                // and the user is not following themselves
                if (currentUser.following !== null
                    && currentUser.following !== undefined
                    && currentUser.following.username !== currentUser.info.username)
                onChange?.(map.get(UserAwarenessViewportParam) as Viewport);
            }

            const map = document.getMap(currentUser.following.username);
            map.observe(onFollowingUserViewportChanged);

            return () => {
                map.unobserve(onFollowingUserViewportChanged);
            }
        }
    }, [document, currentUser.following, currentUser.info.username, onChange]);

    useEffect(() => {
        if (presentation.presenterInfo !== null && presentation.presenterInfo !== undefined) {
            const onPresentingUserViewportChanged = () => {
                // NOTE: only call onChange if the user is following the presenter
                // and the presenter is not themselves
                if (presentation.presentationEnabled
                    && presentation.presenterInfo !== null
                    && presentation.presenterInfo !== undefined
                    && presentation.presenterInfo?.username !== currentUser.info.username) {
                    onChange?.(map.get(UserAwarenessViewportParam) as Viewport);
                }
            }
    
            const map = document.getMap(presentation.presenterInfo.username);
            map.observe(onPresentingUserViewportChanged);
    
            return () => {
                map.unobserve(onPresentingUserViewportChanged);
            }
        }
    }, [document, presentation, currentUser.info.username, onChange]);
}