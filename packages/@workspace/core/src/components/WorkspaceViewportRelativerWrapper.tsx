import { useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { getViewportTransform, viewportSelector } from "../utils";

export const WorkspaceViewportRelativerWrapper: FC<PropsWithChildren<{
    position: { x: number; y: number; };
    pointerEvents?: "none" | "auto";
    zIndex?: number;
}>> = ({
    children,
    position,
    pointerEvents = "auto",
    zIndex = 0
}) => {
    const { viewport } = useStore(viewportSelector);
    const { transform } = getViewportTransform(viewport, position);

    return (
        <div
            className={"workspace_viewport-relative-wrapper"}
            style={{
                pointerEvents: pointerEvents,
                position: "absolute",
                transform: transform,
                zIndex: zIndex
            }}
        >
            {children}
        </div>
    )
}