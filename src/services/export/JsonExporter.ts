import { ReactFlowJsonObject } from "@reactflow/core";
import { ElementNodeProps } from "../../components/c4-view-renderer/components/Nodes/ElementNode";
import { RelationshipEdgeProps } from "../../components/c4-view-renderer/components/Edges/RelationshipEdge";

export function exportToJson(
    filename: string,
    flow: ReactFlowJsonObject<ElementNodeProps, RelationshipEdgeProps>
): File {
    const json = JSON.stringify(flow);
    return new File([json], `${filename}.json`);
}
