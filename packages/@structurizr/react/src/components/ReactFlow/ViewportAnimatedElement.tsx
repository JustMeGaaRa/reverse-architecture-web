import { useViewport } from "@reactflow/core";
import { FC, PropsWithChildren, useRef } from "react";
import { getViewportTransform } from "../../utils";

export const ViewportAnimatedElement: FC<PropsWithChildren<{
    position: { x: number; y: number; };
    zIndex?: number;
}>> = ({
    children,
    position,
    zIndex = 0
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewport = useViewport();
    const { transform } = getViewportTransform(viewport, position);

    const keyframes: Keyframe[] = [{ transform }];
    const options: KeyframeAnimationOptions = { duration: 250, fill: "forwards" };
    containerRef.current?.animate(keyframes, options);

    return (
        <div
            ref={containerRef}
            className={"workspace__viewport-animated"}
            style={{
                position: "absolute",
                transform: transform,
                zIndex: zIndex
            }}
        >
            {children}
        </div>
    )
}