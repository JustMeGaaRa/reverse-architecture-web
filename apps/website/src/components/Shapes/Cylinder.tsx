import { FC, PropsWithChildren } from "react";

type CylinderProps = {
    width: number;
    height: number;
    borderWidth: number;
    borderColor: string;
    backgroundColor: string;
};

export const Cylinder: FC<PropsWithChildren<CylinderProps>> = ({
    width,
    height,
    borderWidth,
    borderColor,
    backgroundColor
}) => {
    const radiusX = 50;
    const radiusY = 5;

    const path1 = `M ${0} ${50} A ${radiusX} ${radiusY} 0 0 1 ${width} ${50} A ${radiusX} ${radiusY} 0 0 1 ${0} ${50} Z`;
    const path2 = `M ${0} ${50} A ${radiusX} ${radiusY} 0 0 0 ${width} ${50} L ${width} ${height - 50} A ${radiusX} ${radiusY} 0 0 1 ${0} ${height - 50} Z`;

    return (
        <svg width={width} height={height}>
            <path d={path1} fill={backgroundColor} stroke={borderColor} strokeWidth={borderWidth} />
            <path d={path2} fill={backgroundColor} stroke={borderColor} strokeWidth={borderWidth} />
        </svg>
    );
}