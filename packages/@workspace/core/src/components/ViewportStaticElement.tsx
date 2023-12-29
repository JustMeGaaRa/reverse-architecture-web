import { useStore } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { getViewportTransform, viewportSelector } from "../utils";

export const ViewportStaticElement: FC<PropsWithChildren<{
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
            className={"workspace__viewport-static"}
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