import { Point, Viewport } from "../types";

export const getViewportPoint = (viewport: Viewport, point: Point) => {
    return {
        x: (point.x * viewport.zoom) + viewport.x,
        y: (point.y * viewport.zoom) + viewport.y
    };
}

export const getAbsolutePoint = (viewport: Viewport, point: Point) => {
    return {
        x: (point.x - viewport.x) / viewport.zoom,
        y: (point.y - viewport.y) / viewport.zoom
    };
}

export const getViewportTransform = (viewport: Viewport, point: Point) => {
    const renderingPoint = getViewportPoint(viewport, point);
    return {
        transform: `translate(${renderingPoint.x}px, ${renderingPoint.y}px)`
    };
}