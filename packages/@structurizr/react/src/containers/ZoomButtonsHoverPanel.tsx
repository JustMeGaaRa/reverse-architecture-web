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
