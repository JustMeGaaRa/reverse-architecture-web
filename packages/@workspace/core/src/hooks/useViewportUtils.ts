import { useReactFlow } from "@reactflow/core";
import { Position } from "@structurizr/dsl";
import { useCallback } from "react";

export type Viewport = {
    x: number;
    y: number;
    zoom: number;
}

export const useViewportUtils = () => {
    const { getViewport } = useReactFlow();
    
    const getRenderingPoint = useCallback((point: Position) => {
        const viewport = getViewport();
        return {
            x: (point.x * viewport.zoom) + viewport.x,
            y: (point.y * viewport.zoom) + viewport.y
        };
    }, [getViewport]);

    const getViewportPoint = useCallback((point: Position) => {
        const viewport = getViewport();
        return {
            x: (point.x - viewport.x) / viewport.zoom,
            y: (point.y - viewport.y) / viewport.zoom
        };
    }, [getViewport]);

    return {
        getRenderingPoint,
        getViewportPoint
    }
}