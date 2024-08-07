import { memo } from "react";
import { IconProps } from "../types";

export const DocumentCopy = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 24 24"  fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3548 7.06253C11.7868 7.06253 12.2003 7.23864 12.5 7.54999L15.4354 10.6081C15.7196 10.9039 15.8782 11.2979 15.8782 11.7075V18.03C15.8889 19.6208 14.6366 20.9353 13.0458 20.9995C13.0458 20.9995 6.93255 20.9995 6.9092 20.9986C5.30475 20.9635 4.03208 19.6344 4.06711 18.03V9.89391C4.10506 8.31476 5.39913 7.05572 6.97925 7.06253H11.3548Z" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.8758 16.9371H17.1056C18.6955 16.8767 19.9555 15.5574 19.9351 13.9675V7.64897C19.9351 7.23934 19.7852 6.83945 19.4953 6.5495L16.5656 3.48947C16.266 3.18006 15.8456 3.00006 15.4156 3.00006H11.0371C9.45702 2.99033 8.16782 4.24937 8.12695 5.82852V7.05934" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.2109 3.04688V5.6029C15.2109 6.85124 16.2199 7.86314 17.4673 7.86606H19.889" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.1484 7.10938V9.6654C11.1484 10.9128 12.1574 11.9256 13.4048 11.9286H15.8256" stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
});
