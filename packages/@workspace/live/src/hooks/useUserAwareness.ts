import { Position } from "@structurizr/dsl";
import { Viewport } from "@workspace/core";
import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";
import {
    UserAwarenessCursorParam,
    UserAwarenessMouseParam,
    UserAwarenessViewportParam
} from "../types";

export const useUserAwareness = () => {
    const {
        workspaceDocument,
        connectionProvider,
        currentUser,
        setCurrentUser
    } = useContext(WorkspaceRoomContext);

    const reportMousePosition = useCallback((mouse: Position) => {
        connectionProvider?.awareness.setLocalStateField(UserAwarenessMouseParam, mouse);
        setCurrentUser(state => ({ ...state, mouse }));
    }, [connectionProvider?.awareness, setCurrentUser]);

    const reportCursorPosition = useCallback((cursor: Position) => {
        connectionProvider?.awareness.setLocalStateField(UserAwarenessCursorParam, cursor);
        setCurrentUser(state => ({ ...state, cursor }));
    }, [connectionProvider?.awareness, setCurrentUser]);

    const reportViewport = useCallback((viewport: Viewport) => {
        const map = workspaceDocument.getMap(currentUser.info.username);
        map.set(UserAwarenessViewportParam, viewport);
        setCurrentUser(state => ({ ...state, viewport }));
    }, [workspaceDocument, currentUser.info.username, setCurrentUser]);

    return {
        reportMousePosition,
        reportCursorPosition,
        reportViewport
    }
}