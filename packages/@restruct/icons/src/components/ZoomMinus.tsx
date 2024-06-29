import { memo } from "react";
import { IconProps } from "../types";

export const ZoomMinus = memo(function ZoomMinus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24" fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.6319 3C16.2807 3 20.049 6.76827 20.049 11.4171C20.049 16.0659 16.2807 19.8351 11.6319 19.8351C6.98312 19.8351 3.21484 16.0659 3.21484 11.4171C3.21484 6.76827 6.98312 3 11.6319 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.3613 17.584L20.7852 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.40039 11.4175H13.8235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
