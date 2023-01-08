import { ReactFlowJsonObject } from "reactflow";
import { IAbstractionProps } from "./nodes/C4RectangleNode";
import { IRelationshipProps } from "./edges/C4FloatingEdge";

export function exportToJson(
    flow: ReactFlowJsonObject<IAbstractionProps, IRelationshipProps>
): string {
    const json = JSON.stringify(flow);
    return json;
}
