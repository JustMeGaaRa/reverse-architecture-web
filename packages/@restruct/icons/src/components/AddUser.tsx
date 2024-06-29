import { memo } from "react";
import { IconProps } from "../types";

export const AddUser = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0782 8.80469V13.3674M21.4 11.0864H16.7578" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.40039 19.9996C3.40039 17.891 5.06403 15.2656 9.85917 15.2656C14.6534 15.2656 16.317 17.8719 16.317 19.9815" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.9848 8.12567C13.9848 10.4043 12.1378 12.2513 9.85909 12.2513C7.58138 12.2513 5.73438 10.4043 5.73438 8.12567C5.73438 5.847 7.58138 4 9.85909 4C12.1378 4 13.9848 5.847 13.9848 8.12567Z" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
