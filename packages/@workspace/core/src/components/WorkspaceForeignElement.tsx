import { ReactFlowState, useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { getViewportTransform, nodeSelector, viewportSelector } from "../utils";

export const WorkspaceElementPortal: FC<PropsWithChildren<{
    selector?: string;
}>> = ({
    children,
    selector = ".react-flow__renderer"
}) => {
    const { rendererNode } = useStore((state: ReactFlowState) => ({
        rendererNode: state.domNode?.querySelector(selector)
    }));

    return !rendererNode ? null : createPortal(children, rendererNode);
}

export const WorkspaceElementRelativeWrapper: FC<PropsWithChildren<{
    nodeId: string;
}>> = ({
    children,
    nodeId
}) => {
    const { viewport } = useStore(viewportSelector);
    const { node } = useStore(nodeSelector(nodeId))
    const { transform } = getViewportTransform(viewport, node.position);

    return (
        <div style={{ position: "absolute", transform: transform, zIndex: 10000 }}>
            {children}
        </div>
    )
}

export const WorkspaceViewportRelativerWrapper: FC<PropsWithChildren<{
    position: { x: number; y: number; }
}>> = ({
    children,
    position
}) => {
    const { viewport } = useStore(viewportSelector);
    const { transform } = getViewportTransform(viewport, position);

    return (
        <div style={{ position: "absolute", transform: transform, zIndex: 10000 }}>
            {children}
        </div>
    )
}