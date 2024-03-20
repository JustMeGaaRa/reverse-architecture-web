import { useOnViewportChange, useReactFlow } from "@reactflow/core";
import { IViewDefinition, Position } from "@structurizr/dsl";
import { throttle } from "lodash";
import { useCallback, useEffect } from "react";
import { useMouseLeave, useMouseMove, useWorkspaceNavigation } from "../hooks";
import { Viewport } from "../types";
import { getAbsolutePoint } from "../utils";

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

type CurrentViewCallbacks = {
    onChange?: (view: IViewDefinition) => void;
}

export const useOnUserViewChange = (callbacks: CurrentViewCallbacks) => {
    const { currentView } = useWorkspaceNavigation();
    const { onChange } = callbacks;

    useEffect(() => onChange?.(currentView), [currentView, onChange]);
}