import { useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { edgeSelector, getViewportTransform, viewportSelector } from "../utils";

export const WorkspaceEdgeRelativeWrapper: FC<PropsWithChildren<{
    edgeId: string;
}>> = ({
    children,
    edgeId
}) => {
    const { viewport } = useStore(viewportSelector);
    const { edge } = useStore(edgeSelector(edgeId));

    if (!edge) return null;

    const edgePosition = {
        x: edge.sourceNode.positionAbsolute.x + edge.targetNode.positionAbsolute.x / 2,
        y: edge.sourceNode.positionAbsolute.y + edge.targetNode.positionAbsolute.y / 2
    };
    const { transform } = getViewportTransform(viewport, edgePosition);

    return (
        <div
            className={"workspace_edge-relative-wrapper"}
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