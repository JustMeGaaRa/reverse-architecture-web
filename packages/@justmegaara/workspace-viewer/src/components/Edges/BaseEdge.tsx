import { FC, PropsWithChildren, CSSProperties } from "react";

type BaseEdgeProps = {
    path: string,
    labelX: number,
    labelY: number,
    style: CSSProperties,
    markerEnd?: string,
    markerStart?: string,
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
                fill="none"
                style={style}
                markerEnd={markerEnd}
                markerStart={markerStart}
            />
            {interactionWidth && (
                <path
                    className="react-flow__edge-interaction"
                    d={path}
                    fill="none"
                    strokeOpacity={0}
                    strokeWidth={interactionWidth}
                />
            )}
            {children}
        </>
    );
}
