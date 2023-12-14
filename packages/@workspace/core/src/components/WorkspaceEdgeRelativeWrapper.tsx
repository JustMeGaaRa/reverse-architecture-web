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
    const edgePosition = {
        x: edge.sourceNode.position.x + edge.targetNode.position.x / 2,
        y: edge.sourceNode.position.y + edge.targetNode.position.y / 2
    };
    const { transform } = getViewportTransform(viewport, edgePosition);

    return (
        <div style={{ position: "absolute", transform: transform }}>
            {children}
        </div>
    )
}