import { Position, ViewType } from "@structurizr/dsl";
import { Viewport } from "@workspace/core";
import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";
import {
    UserAwarenessCursorParam,
    UserAwarenessMouseParam,
    UserAwarenessViewportParam,
    UserAwarenessViewParam
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

    const reportView = useCallback((view: { type: ViewType, identifier: string }) => {
        connectionProvider?.awareness.setLocalStateField(UserAwarenessViewParam, view);
        setCurrentUser(state => ({ ...state, view }));
    }, [connectionProvider?.awareness, setCurrentUser]);

    return {
        reportMousePosition,
        reportCursorPosition,
        reportViewport,
        reportView
    }
}