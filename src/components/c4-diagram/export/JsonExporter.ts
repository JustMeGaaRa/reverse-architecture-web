import { ReactFlowJsonObject } from "@reactflow/core";
import { C4FloatingEdgeProps } from "../components/EdgeTypes";
import { C4RectangleProps } from "../components/NodeTypes";

export function exportToJson(
    filename: string,
    flow: ReactFlowJsonObject<C4RectangleProps, C4FloatingEdgeProps>
): File {
    const json = JSON.stringify(flow);
    return new File([json], `${filename}.json`);
}
