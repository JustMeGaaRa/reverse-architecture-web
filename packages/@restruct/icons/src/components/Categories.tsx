import { memo } from "react";
import { IconProps } from "../types";

export const Categories = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 26 24" fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.598 3.43639L20.1431 6.68715C21.1978 7.305 21.1978 8.8287 20.1431 9.44655L14.598 12.6973C13.6056 13.2792 12.3767 13.2792 11.3842 12.6973L5.83914 9.44655C4.78539 8.8287 4.78539 7.305 5.83914 6.68715L11.3842 3.43639C12.3767 2.85454 13.6056 2.85454 14.598 3.43639Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.76832 11.75L5.61073 14.5152C4.62801 15.1701 4.66985 16.6286 5.68857 17.225L11.3825 20.5633C12.375 21.1452 13.6048 21.1452 14.5963 20.5633L20.2708 17.2367C21.2953 16.6364 21.3313 15.1701 20.3389 14.5191L16.1531 11.7841" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
