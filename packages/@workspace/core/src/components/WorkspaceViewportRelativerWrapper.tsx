import { useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { getViewportTransform, viewportSelector } from "../utils";

export const WorkspaceViewportRelativerWrapper: FC<PropsWithChildren<{
    position: { x: number; y: number; }
}>> = ({
    children,
    position
}) => {
    const { viewport } = useStore(viewportSelector);
    const { transform } = getViewportTransform(viewport, position);

    return (
        <div style={{ position: "absolute", transform: transform }}>
            {children}
        </div>
    )
}