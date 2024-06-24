import { FC, PropsWithChildren, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Box, useViewport } from "../components";
import { useWorkspace } from "../Workspace";
import { ZoomButtonGroup } from "./ZoomButtonGroup";
import { ViewportForeignObject } from "./ViewportForeignObject";

export const ZoomButtonsHoverPanel: FC<PropsWithChildren<{
    position?: { x: number; y: number };
    zoomIn?: boolean;
    zoomOut?: boolean;
    onZoomInClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onZoomOutClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>> = ({
    children,
    position,
    zoomIn,
    zoomOut,
    onZoomInClick,
    onZoomOutClick
}) => {
    const { workspaceDomNode } = useWorkspace();
    const { zoom } = useViewport();
    const [isHovered, setIsHovered] = useState(false);

    const handleOnMouseOver = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
        setIsHovered(true);
        event.stopPropagation();
    }, []);

    const handleOnMouseOut = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
        setIsHovered(false);
        event.stopPropagation();
    }, []);
    
    return (
        <Box
            className={"structurizr__zoom-controls"}
            position={position}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
        >
            {createPortal((
                <ViewportForeignObject>
                    <ZoomButtonGroup
                        isPanelVisible={isHovered && zoom > 0.5 && zoom < 2.5}
                        isZoomInVisible={zoomIn}
                        isZoomOutVisible={zoomOut}
                        onZoomInClick={onZoomInClick}
                        onZoomOutClick={onZoomOutClick}
                    />
                </ViewportForeignObject>
            ), workspaceDomNode)}
            {children}
        </Box>
    );
};

export const ZoomPlus = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" color="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.049 11.4171C20.049 6.76827 16.2807 3 11.6319 3C6.98312 3 3.21484 6.76827 3.21484 11.4171C3.21484 16.0659 6.98312 19.8351 11.6319 19.8351C16.2807 19.8351 20.049 16.0659 20.049 11.4171Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.3613 17.584L20.7852 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.40039 11.4175H13.8235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.6123 9.20605L11.6123 13.6291" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};

export const ZoomMinus = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" color="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.6319 3C16.2807 3 20.049 6.76827 20.049 11.4171C20.049 16.0659 16.2807 19.8351 11.6319 19.8351C6.98312 19.8351 3.21484 16.0659 3.21484 11.4171C3.21484 6.76827 6.98312 3 11.6319 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.3613 17.584L20.7852 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.40039 11.4175H13.8235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};
