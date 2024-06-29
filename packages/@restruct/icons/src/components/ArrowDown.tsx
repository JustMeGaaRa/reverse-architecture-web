import { memo } from "react";
import { IconProps } from "../types";

export const ArrowDown = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`}  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>Iconly/Light/Arrow - Down 2</title>
            <g id="Iconly/Light/Arrow---Down-2" stroke="currentColor"  strokeWidth="1.5"  fill="none" color="currentColor" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Arrow---Down-2" transform="translate(5.000000, 8.500000)" stroke="currentColor"  strokeWidth="1.5" >
                    <polyline id="Stroke-1" points="14 0 7 7 0 0"></polyline>
                </g>
            </g>
        </svg>
    )
});
