import { memo } from "react";
import { IconProps } from "../types";

export const Document3Lines = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.04403 20.999C5.9716 20.9533 4.32825 19.236 4.37398 17.1636V6.65646C4.42263 4.61711 6.09419 2.99128 8.13451 3.00004H13.7855C14.344 3.00004 14.8782 3.22674 15.2644 3.62955L19.0561 7.57884C19.4219 7.96121 19.6272 8.47008 19.6272 8.9984V17.1636C19.6409 19.2185 18.0238 20.9163 15.9698 21M8.04403 20.999C8.07419 20.999 8.10435 21 8.13451 21H15.9698M8.04403 20.999C8.07419 20.999 15.9698 21 15.9698 21" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.2695 3.0625V5.95514C14.2686 7.36692 15.4118 8.51211 16.8236 8.51503H19.5625" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.51562 16.4818H12.9748M8.51562 13.0612H15.2427M8.51562 9.64062H11.4579" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
