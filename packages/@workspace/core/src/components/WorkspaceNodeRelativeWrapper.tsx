import { useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { getViewportTransform, nodeSelector, viewportSelector } from "../utils";

export const WorkspaceNodeRelativeWrapper: FC<PropsWithChildren<{
    nodeId: string;
}>> = ({
    children,
    nodeId
}) => {
    const { viewport } = useStore(viewportSelector);
    const { node } = useStore(nodeSelector(nodeId));
    const nodePosition = {
        x: node.position.x + node.width / 2,
        y: node.position.y + node.height / 2
    };
    const { transform } = getViewportTransform(viewport, node.position);

    return (
        <div style={{ position: "absolute", transform: transform }}>
            {children}
        </div>
    )
}