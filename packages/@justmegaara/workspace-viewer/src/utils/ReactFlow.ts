import { Viewport, XYPosition } from "@reactflow/core";

export const projectPoint = (viewport: Viewport, point: XYPosition) => {
    return {
        x: (point.x * viewport.zoom) + viewport.x,
        y: (point.y * viewport.zoom) + viewport.y
    };
}
export const normalizePoint = (viewport: Viewport, point: XYPosition) => {
    return {
        x: (point.x - viewport.x) / viewport.zoom,
        y: (point.y - viewport.y) / viewport.zoom
    };
}