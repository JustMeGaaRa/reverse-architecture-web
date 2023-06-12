type Viewport = {
    x: number;
    y: number;
    zoom: number;
}

type Position = {
    x: number;
    y: number;
}

export const getRenderingPoint = (viewport: Viewport, point: Position) => {
    return {
        x: (point.x * viewport.zoom) + viewport.x,
        y: (point.y * viewport.zoom) + viewport.y
    };
}
export const getViewportPoint = (viewport: Viewport, point: Position) => {
    return {
        x: (point.x - viewport.x) / viewport.zoom,
        y: (point.y - viewport.y) / viewport.zoom
    };
}