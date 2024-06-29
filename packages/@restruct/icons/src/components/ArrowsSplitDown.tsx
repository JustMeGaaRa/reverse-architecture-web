import { memo } from "react";
import { IconProps } from "../types";

export const ArrowsSplitDown = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24" fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M6 21L6 15.603C6.00015 13.9714 6.95555 12.4425 8.5596 11.507L9.4404 10.993C11.0444 10.0575 11.9999 8.52857 12 6.897V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 21L18 15.605C18.0001 13.9724 17.0437 12.4425 15.438 11.507L14.562 10.997C12.9567 10.0617 12.0003 8.53229 12 6.9L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5 18.5L18 21L20.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 18.5L6 21L8.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
