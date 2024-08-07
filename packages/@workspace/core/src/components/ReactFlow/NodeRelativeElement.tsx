import { useViewport } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { useNode } from "../../hooks";
import { getViewportTransform } from "../../utils";

export const NodeRelativeElement: FC<PropsWithChildren<{
    nodeId: string;
}>> = ({
    children,
    nodeId
}) => {
    const viewport = useViewport();
    const { node } = useNode(nodeId);
    
    if (!node) return null;

    const nodePosition = {
        x: node.positionAbsolute.x + node.width / 2,
        y: node.positionAbsolute.y + node.height / 2
    };
    const { transform } = getViewportTransform(viewport, node.positionAbsolute);

    return (
        <div
            className={"workspace__node-relative"}
            style={{
                pointerEvents: "none",
                position: "absolute",
                transform: transform
            }}
        >
            {children}
        </div>
    )
}