import { memo } from "react";
import { IconProps } from "../types";

export const FlowChart = memo(function ZoomPlus(props: IconProps) {
    const { boxSize = 4, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 25 25" fill="none" color={`${color ?? "currentColor"}`} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 6.63385L9 5.10242C9 4.28318 9.662 3.61865 10.4791 3.61865L14.5219 3.61865C15.339 3.61865 16 4.28318 16 5.10242V6.63386C16 7.45406 15.339 8.11859 14.5219 8.11859H10.4791C9.662 8.11859 9 7.45406 9 6.63385Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.5 19.1339L3.5 17.6024C3.5 16.7832 4.162 16.1187 4.97909 16.1187L9.02188 16.1187C9.83897 16.1187 10.5 16.7832 10.5 17.6024V19.1339C10.5 19.9541 9.83897 20.6186 9.02188 20.6186H4.97909C4.162 20.6186 3.5 19.9541 3.5 19.1339Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.5 19.1339L14.5 17.6024C14.5 16.7832 15.162 16.1187 15.9791 16.1187L20.0219 16.1187C20.839 16.1187 21.5 16.7832 21.5 17.6024V19.1339C21.5 19.9541 20.839 20.6186 20.0219 20.6186H15.9791C15.162 20.6186 14.5 19.9541 14.5 19.1339Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 8.11865L12.5 12.1187" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M18 16.1187V14.1187C18 13.0141 17.1046 12.1187 16 12.1187H9C7.89543 12.1187 7 13.0141 7 14.1187V16.1187" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
});
