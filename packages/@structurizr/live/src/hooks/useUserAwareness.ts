import { Position, ViewType } from "@structurizr/dsl";
import { Viewport } from "@structurizr/react";
import { useYjsCollaborative } from "@yjs/react";
import { useCallback, useContext } from "react";
import { WorkspaceRoomContext } from "../contexts";
import {
    UserAwarenessCursorParam,
    UserAwarenessMouseParam,
    UserAwarenessViewportParam,
    UserAwarenessViewParam
} from "../types";

export const useUserAwareness = () => {
    const { currentUser, setCurrentUser } = useContext(WorkspaceRoomContext);
    const { document, connection } = useYjsCollaborative();

    const reportMousePosition = useCallback((mouse: Position) => {
        connection?.awareness.setLocalStateField(UserAwarenessMouseParam, mouse);
        setCurrentUser(state => ({ ...state, mouse }));
    }, [connection?.awareness, setCurrentUser]);

    const reportCursorPosition = useCallback((cursor: Position) => {
        connection?.awareness.setLocalStateField(UserAwarenessCursorParam, cursor);
        setCurrentUser(state => ({ ...state, cursor }));
    }, [connection?.awareness, setCurrentUser]);

    const reportViewport = useCallback((viewport: Viewport) => {
        const map = document.getMap(currentUser.info.username);
        map.set(UserAwarenessViewportParam, viewport);
        setCurrentUser(state => ({ ...state, viewport }));
    }, [document, currentUser.info.username, setCurrentUser]);

    const reportView = useCallback((view: { type: ViewType, identifier: string }) => {
        connection?.awareness.setLocalStateField(UserAwarenessViewParam, view);
        setCurrentUser(state => ({ ...state, view }));
    }, [connection?.awareness, setCurrentUser]);

    return {
        reportMousePosition,
        reportCursorPosition,
        reportViewport,
        reportView
    }
}