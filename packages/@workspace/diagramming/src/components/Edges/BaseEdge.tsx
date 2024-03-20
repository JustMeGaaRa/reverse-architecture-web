import { FC, PropsWithChildren, CSSProperties } from "react";
import { MarkerType } from "../MarkerType";

type BaseEdgeProps = {
    path: string,
    labelX: number,
    labelY: number,
    style: CSSProperties,
    markerEnd?: MarkerType,
    markerStart?: MarkerType,
    interactionWidth: number,
}

export const BaseEdge: FC<PropsWithChildren<BaseEdgeProps>> = ({
    children,
    path,
    style,
    markerEnd,
    markerStart,
    interactionWidth = 20,
}) => {
    return (
        <>
            <path
                className="react-flow__edge-path"
                d={path}
                fill={"none"}
                style={style}
                markerStart={`url(#${markerStart})`}
                markerEnd={`url(#${markerEnd})`}
            />
            {interactionWidth && (
                <path
                    className="react-flow__edge-interaction"
                    d={path}
                    fill={"none"}
                    strokeOpacity={0}
                    strokeWidth={interactionWidth}
                />
            )}
            {children}
        </>
    );
}
