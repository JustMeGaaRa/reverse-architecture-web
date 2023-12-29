import { useReactFlow } from "@reactflow/core";
import { ViewType } from "@structurizr/dsl";
import { getAbsolutePoint, useMouseLeave, useMouseMove, UserInfo } from "@workspace/core";
import { throttle } from "lodash";
import { FC, useCallback, useEffect } from "react";
import { useWorkspaceRoom } from "../hooks";

export const CurrentUser: FC<{ info: UserInfo }> = ({ info }) => {
    const { joinRoom, leaveRoom, setUserLocation } = useWorkspaceRoom();
    const { getViewport } = useReactFlow();

    const handleOnMouseMove = useCallback(throttle((event: MouseEvent) => {
        const parentOffset = document
            .querySelector(".react-flow")
            ?.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const viewport = getViewport();
        const pointRelativeToViewport = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointTranslatedFromViewport = getAbsolutePoint(viewport, pointRelativeToViewport);
        setUserLocation({
            mouse: pointTranslatedFromViewport,
            type: ViewType.SystemLandscape,
            identifier: ""
        });
    }, 100), [setUserLocation, getViewport]);

    const handleOnMouseLeave = useCallback(throttle(() => {
        setUserLocation({
            mouse: undefined,
            type: ViewType.SystemLandscape,
            identifier: ""
        });
    }, 100), [setUserLocation]);

    
    useEffect(() => {
        if (info) { joinRoom(info); }
        
        return () => {
            if (info) { leaveRoom(); }
        }
    }, [info, joinRoom, leaveRoom]);
    
    useMouseMove(document.querySelector(".react-flow__pane"), handleOnMouseMove);
    useMouseLeave(document.querySelector(".react-flow__pane"), handleOnMouseLeave);

    return null;
}