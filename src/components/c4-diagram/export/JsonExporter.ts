import { ReactFlowJsonObject } from "reactflow";
import { C4RectangleProps } from "../NodeTypes";
import { C4FloatingEdgeProps } from "../EdgeTypes";

export function exportToJson(
    flow: ReactFlowJsonObject<C4RectangleProps, C4FloatingEdgeProps>
): string {
    const json = JSON.stringify(flow);
    return json;
}
