import { ReactFlowJsonObject } from "reactflow";
import { C4RectangleProps } from "../nodes/C4RectangleNode";
import { C4FloatingEdgeProps } from "../edges/C4FloatingEdge";

export function exportToJson(
    flow: ReactFlowJsonObject<C4RectangleProps, C4FloatingEdgeProps>
): string {
    const json = JSON.stringify(flow);
    return json;
}
