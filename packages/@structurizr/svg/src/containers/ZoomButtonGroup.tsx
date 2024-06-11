import { FC, PropsWithChildren, useCallback, useState } from "react";
import { ButtonGroup, IconButton, useViewport } from "../components";

export const ZoomButtonGroup: FC<PropsWithChildren<{
    position?: { x: number; y: number };
    zoomIn?: boolean;
    zoomOut?: boolean;
}>> = ({
    children,
    position,
    zoomIn,
    zoomOut,
}) => {
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

    const handleOnZoomIn = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
    }, []);

    const handleOnZoomOut = useCallback((event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
    }, []);
    
    return (
        <g
            className={"structurizr__zoom-controls"}
            transform={`translate(${position.x},${position.y})`}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
        >
            {isHovered && zoom > 0.5 && zoom < 2.5 && (
                <ButtonGroup x={-30/zoom} y={15/zoom} height={30} width={60} scale={1/zoom}>
                    {zoomIn && (<IconButton icon={<ZoomPlus />} onClick={handleOnZoomIn} />)}
                    {zoomOut && (<IconButton icon={<ZoomMinus />} onClick={handleOnZoomOut} />)}
                </ButtonGroup>
            )}
            {children}
        </g>
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
