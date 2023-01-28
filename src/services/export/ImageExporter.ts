import { ReactFlowJsonObject } from "@reactflow/core";
import { ElementNodeProps } from "../../components/c4-view-renderer/components/Nodes/ElementNode";
import { RelationshipEdgeProps } from "../../components/c4-view-renderer/components/Edges/RelationshipEdge";
import * as HtmlToImage from "html-to-image";

export async function exportToImage(
    filename: string,
    flow: ReactFlowJsonObject<ElementNodeProps, RelationshipEdgeProps>
): Promise<File> {
    const flowDoc = document.querySelector<HTMLElement>(".react-flow");
    const image = await HtmlToImage.toPng(flowDoc, {
        filter: (node) => {
            return node?.classList?.contains('react-flow__minimap') ||
                node?.classList?.contains('react-flow__controls');
        }
    });
    return new File([image], `${filename}.png`);
}