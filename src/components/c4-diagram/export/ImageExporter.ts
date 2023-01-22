import { ReactFlowJsonObject } from "@reactflow/core";
import { C4FloatingEdgeProps } from "../components/EdgeTypes";
import { C4RectangleProps } from "../components/NodeTypes";
import * as HtmlToImage from "html-to-image";

export async function exportToImage(
    filename: string,
    flow: ReactFlowJsonObject<C4RectangleProps, C4FloatingEdgeProps>
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