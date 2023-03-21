import { ReactFlowJsonObject, Viewport, XYPosition } from "@reactflow/core";

const isReactFlowJsonObject = (
    value: object
): value is ReactFlowJsonObject => {
    const flow = value as ReactFlowJsonObject;
    return flow.nodes !== undefined
        && flow.edges !== undefined
        && flow.viewport !== undefined;
}

export const parseReactFlow = (
    json: string
) => {
    // try {
    //     const flow = JSON.parse(json);

    //     return isReactFlowJsonObject(flow)
    //         ? Ok(flow)
    //         : Err(new Error("The file content is not assignable to React Flow JSON object."));
    // }
    // catch (error) {
    //     return Err(new Error("The file content is not a valid JSON."));
    // }
}

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