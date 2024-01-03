import { useReactFlow, useStore } from "@reactflow/core";
import { ViewType } from "@structurizr/dsl";
import { getAbsolutePoint, useMouseLeave, useMouseMove, UserInfo, UserLocation } from "@workspace/core";
import { throttle } from "lodash";
import { FC, useCallback, useEffect } from "react";
import { useWorkspaceRoom } from "../hooks";

type UserInfoProps = {
    info: Required<Pick<UserInfo, "username" | "fullname">>
        & Partial<Pick<UserInfo, "color">>;
    location?: Required<Pick<UserLocation, "type" | "identifier">>
        & Partial<Pick<UserLocation, "mouse" | "cursor">>;
};

export const CurrentUser: FC<UserInfoProps> = ({ info, location }) => {
    const { joinRoom, leaveRoom, setUserLocation } = useWorkspaceRoom();
    const { getViewport } = useReactFlow();
    const { domNode } = useStore(state => ({ domNode: state.domNode }));

    const handleOnMouseMove = useCallback(throttle((event: MouseEvent) => {
        const parentOffset = domNode?.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const viewport = getViewport();
        const pointRelativeToViewport = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointTranslatedFromViewport = getAbsolutePoint(viewport, pointRelativeToViewport);
        setUserLocation({
            mouse: pointTranslatedFromViewport,
            type: location?.type,
            identifier: location?.identifier
        });
    }, 100), [setUserLocation, getViewport, location]);

    const handleOnMouseLeave = useCallback(throttle(() => {
        setUserLocation({
            mouse: undefined,
            type: ViewType.None,
            identifier: ""
        });
    }, 100), [setUserLocation]);

    
    useEffect(() => {
        if (info) {
            const colorSchemes = [
                "gray", "red", "orange", "yellow",
                "lime", "green", "cyan", "blue",
                "purple", "pink"
            ];
            const randomIndex = Math.floor(Math.random() * colorSchemes.length);
            const colorized = {
                ...info,
                color: info.color ?? colorSchemes.at(randomIndex)
            }
            joinRoom(colorized);
        }
        
        return () => { leaveRoom(); }
    }, [info, joinRoom, leaveRoom]);
    
    useMouseMove(domNode, handleOnMouseMove);
    useMouseLeave(domNode, handleOnMouseLeave);

    return null;
}