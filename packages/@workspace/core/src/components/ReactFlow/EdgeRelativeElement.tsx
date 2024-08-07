import { useViewport } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { useEdge } from "../../hooks";
import { getViewportTransform } from "../../utils";

export const EdgeRelativeElement: FC<PropsWithChildren<{
    edgeId: string;
}>> = ({
    children,
    edgeId
}) => {
    const viewport = useViewport();
    const { edge } = useEdge(edgeId);

    if (!edge) return null;

    const edgePosition = {
        x: edge.sourceNode.positionAbsolute.x + edge.targetNode.positionAbsolute.x / 2,
        y: edge.sourceNode.positionAbsolute.y + edge.targetNode.positionAbsolute.y / 2
    };
    const { transform } = getViewportTransform(viewport, edgePosition);

    return (
        <div
            className={"workspace__edge-relative"}
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