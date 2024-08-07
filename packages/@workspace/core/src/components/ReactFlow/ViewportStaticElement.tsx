import { useViewport } from "@reactflow/core";
import { FC, PropsWithChildren } from "react";
import { getViewportTransform } from "../../utils";

export const ViewportStaticElement: FC<PropsWithChildren<{
    position: { x: number; y: number; };
    pointerEvents?: "none" | "auto";
    zIndex?: number;
}>> = ({
    children,
    position,
    pointerEvents = "none",
    zIndex = 0
}) => {
    const viewport = useViewport();
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