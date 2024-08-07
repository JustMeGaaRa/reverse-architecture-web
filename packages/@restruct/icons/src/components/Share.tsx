import { memo } from "react";
import { IconProps } from "../types";

export const Share = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4959 15.0279V15.0367M14.3025 5.69944C14.3025 4.4278 13.2712 3.39648 11.9995 3.39648C10.7279 3.39648 9.69657 4.4278 9.69657 5.69944C9.69657 6.97107 10.7279 8.00239 11.9995 8.00239C13.2712 8.00239 14.3025 6.97107 14.3025 5.69944ZM7.6059 17.1876C7.6059 15.9159 6.57459 14.8846 5.30295 14.8846C4.03132 14.8846 3 15.9159 3 17.1876C3 18.4592 4.03132 19.4905 5.30295 19.4905C6.57459 19.4905 7.6059 18.4592 7.6059 17.1876ZM21 17.1876C21 15.9159 19.9687 14.8846 18.697 14.8846C17.4254 14.8846 16.3941 15.9159 16.3941 17.1876C16.3941 18.4592 17.4254 19.4905 18.697 19.4905C19.9687 19.4905 21 18.4592 21 17.1876Z" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.9844 20.5845C15.183 20.2761 16.264 19.6855 17.1532 18.8867" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.50209 11.2676C4.35712 11.8669 4.27539 12.4847 4.27539 13.1201C4.27539 13.7739 4.35712 14.4189 4.51084 15.027" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0205 20.601C8.82376 20.2838 7.74768 19.6865 6.86328 18.8809" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.24609 7.9634C7.16358 6.93694 8.35251 6.15665 9.69712 5.73828" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.3027 5.73828C15.6376 6.15567 16.8178 6.92819 17.7265 7.93616" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.5049 11.2676C19.6498 11.8669 19.7315 12.4847 19.7315 13.1201C19.7315 13.7739 19.6498 14.4189 19.4961 15.027" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
