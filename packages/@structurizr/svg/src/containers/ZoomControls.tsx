import { FC, PropsWithChildren, useCallback, useState } from "react";
import { useViewport } from "../ViewportProvider";

export const ZoomControls: FC<PropsWithChildren<{
    position?: { x: number; y: number };
}>> = ({
    children,
    position,
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
    
    return (
        <g
            data-x={position.x}
            data-y={position.y}
            transform={`translate(${position.x},${position.y})`}
            onMouseOver={handleOnMouseOver}
            onMouseOut={handleOnMouseOut}
        >
            {isHovered && zoom > 0.5 && zoom < 2.5 && (
                <rect
                    cursor={"pointer"}
                    fill={"white"}
                    height={30 / zoom}
                    width={60 / zoom}
                    x={-30 / zoom}
                    y={15 / zoom}
                    rx={7 / zoom}
                    ry={7 / zoom}
                />
            )}
            {children}
        </g>
    )
}