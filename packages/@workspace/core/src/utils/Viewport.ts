import { ReactFlowState } from "@reactflow/core/dist/esm/types";
import { Point, Viewport } from "../types";

export const nodeSelector = (nodeId: string) => {
    return (state: ReactFlowState) => ({
        node: state.nodeInternals.get(nodeId)
    })
}

export const edgeSelector = (edgeId: string) => {
    return (state: ReactFlowState) => ({
        edge: state.edges.find(edge => edge.id === edgeId)
    })
}

export const viewportSelector = (state: ReactFlowState) => ({
    viewport: {
        x: state.transform?.at(0) ?? 0,
        y: state.transform?.at(1) ?? 0,
        zoom: state.transform?.at(2) ?? 1
    }
})

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