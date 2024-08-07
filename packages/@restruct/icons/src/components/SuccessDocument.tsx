import { memo } from "react";
import { IconProps } from "../types";

export const SuccessDocument = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24" fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.76305 9.96484C5.34688 9.96484 4.19922 11.1121 4.19922 12.5277V17.6843C4.19922 19.1002 5.34716 20.2481 6.76305 20.2481H17.2367C18.6515 20.2481 19.7996 19.1003 19.7996 17.6843V12.5277C19.7996 11.112 18.6518 9.96484 17.2367 9.96484H6.76305ZM2.69922 12.5277C2.69922 10.2831 4.51902 8.46484 6.76305 8.46484H17.2367C19.4799 8.46484 21.2996 10.2832 21.2996 12.5277V17.6843C21.2996 19.9284 19.4802 21.7481 17.2367 21.7481H6.76305C4.51874 21.7481 2.69922 19.9286 2.69922 17.6843V12.5277Z" fill="#000000" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.2255 13.0087C15.5184 13.3015 15.5185 13.7764 15.2256 14.0693L12.0908 17.2051C11.9502 17.3458 11.7594 17.4248 11.5605 17.4248C11.3615 17.4249 11.1707 17.3458 11.0301 17.2052L9.41694 15.592C9.12404 15.2991 9.12404 14.8243 9.41694 14.5314C9.70983 14.2385 10.1847 14.2385 10.4776 14.5314L11.5603 15.6141L14.1648 13.0088C14.4576 12.7159 14.9325 12.7158 15.2255 13.0087Z" fill="#000000" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M7.9685 3C7.9685 2.58579 8.30429 2.25 8.7185 2.25H15.28C15.6942 2.25 16.03 2.58579 16.03 3C16.03 3.41421 15.6942 3.75 15.28 3.75H8.7185C8.30429 3.75 7.9685 3.41421 7.9685 3ZM5.43164 6.11169C5.43164 5.69748 5.76743 5.36169 6.18164 5.36169H17.817C18.2312 5.36169 18.567 5.69748 18.567 6.11169C18.567 6.52591 18.2312 6.86169 17.817 6.86169H6.18164C5.76743 6.86169 5.43164 6.52591 5.43164 6.11169Z" fill="#000000" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
});
