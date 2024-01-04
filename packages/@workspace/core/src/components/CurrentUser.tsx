import { useReactFlow, useStore } from "@reactflow/core";
import { Position } from "@structurizr/dsl";
import { throttle } from "lodash";
import { FC, useCallback } from "react";
import { useMouseLeave, useMouseMove } from "../hooks";
import { Viewport } from "../types";
import { getAbsolutePoint, viewportSelector } from "../utils";

export const CurrentUser: FC<{
    onMouseUpdated?: (point: Position) => void;
    onViewportUpdated?: (viewport: Viewport) => void;
}> = ({
    onMouseUpdated,
    onViewportUpdated
}) => {
    const { getViewport } = useReactFlow();
    const { domNode, viewport } = useStore(state => ({ domNode: state.domNode, viewport: viewportSelector(state) }));

    const handleOnMouseMove = useCallback(throttle((event: MouseEvent) => {
        const parentOffset = domNode?.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const viewport = getViewport();
        const pointRelativeToViewport = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointTranslatedFromViewport = getAbsolutePoint(viewport, pointRelativeToViewport);
        onMouseUpdated?.(pointTranslatedFromViewport);
    }, 100), [onMouseUpdated, getViewport, location]);

    const handleOnMouseLeave = useCallback(throttle(() => {
        onMouseUpdated?.(undefined);
    }, 100), [onMouseUpdated]);
    
    useMouseMove(domNode, handleOnMouseMove);
    useMouseLeave(domNode, handleOnMouseLeave);
    
    return null;
}