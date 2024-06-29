import { memo } from "react";
import { IconProps } from "../types";

export const Close = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`}  xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 6L6 18" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
