import { useOnViewportChange, useReactFlow } from "@reactflow/core";
import { Position } from "@structurizr/dsl";
import { getAbsolutePoint, Viewport, useMouseMove, useMouseLeave } from "@structurizr/react";
import { throttle } from "lodash";
import { useCallback } from "react";

type UserAwarenessCallbacks = {
    onChange?: (position: Position) => void
}

export const useOnUserAwarenessChange = (callbacks: UserAwarenessCallbacks) => {
    const { getViewport } = useReactFlow();
    const { onChange } = callbacks;

    const domNode = document.querySelector<HTMLDivElement>(".workspace__renderer");

    const onMouseMove = useCallback((event: MouseEvent) => {
        const parentOffset = domNode?.getBoundingClientRect();
        const mousePoint = { x: event.clientX, y: event.clientY };
        const pointOnScreen = {
            x: mousePoint.x - parentOffset.left,
            y: mousePoint.y - parentOffset.top
        };
        const pointOnViewport = getAbsolutePoint(getViewport(), pointOnScreen);
        onChange?.(pointOnViewport);
    }, [domNode, getViewport, onChange]);

    const onMouseLeave = useCallback((event: MouseEvent) => {
        onChange?.(undefined)
    }, [onChange]);

    const handleOnMouseMove = useCallback(throttle(onMouseMove, 100), [onMouseMove]);
    const handleOnMouseLeave = useCallback(throttle(onMouseLeave, 100), [onMouseLeave]);
    
    useMouseMove(domNode, handleOnMouseMove);
    useMouseLeave(domNode, handleOnMouseLeave);
}

type ViewportCallbacks = {
    onStart?: (viewport: Viewport) => void;
    onChange?: (viewport: Viewport) => void;
    onEnd?: (viewport: Viewport) => void;
}

export const useOnUserViewportChange = (callbacks: ViewportCallbacks) => {
    useOnViewportChange({
        onStart: callbacks.onStart,
        onChange: callbacks.onChange,
        onEnd: callbacks.onEnd
    })
}