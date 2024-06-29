import { memo } from "react";
import { IconProps } from "../types";

export const Home = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.78462 21H17.2159C19.0509 21 20.5376 19.5123 20.5376 17.6783V10.5045C20.5376 9.6133 20.1367 8.76973 19.4459 8.20638L13.8718 3.66551C12.782 2.77816 11.2185 2.77816 10.1287 3.66551L4.55457 8.20638C3.86376 8.76973 3.46289 9.6133 3.46289 10.5045V17.6783C3.46289 19.5123 4.94959 21 6.78462 21Z" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.36523 15.834H14.6378" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
