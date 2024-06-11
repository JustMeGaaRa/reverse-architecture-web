import { FC, PropsWithChildren } from "react";
import { Box } from "./Box";

// TODO: make position, height and width required
export const Node: FC<PropsWithChildren<{
    id?: string;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
}>> = ({
    children,
    id,
    position = { x: 0, y: 0 },
    height = 200,
    width = 200,
    borderWidth = 2,
    borderRadius = 16,
    padding = 4,
}) => {
    return (
        <Box id={id} className={"structurizr__node"} position={position}>
            <defs>
                <clipPath id="clip">
                    <rect
                        x={borderWidth + padding}
                        y={borderWidth + padding}
                        width={width - padding * 2}
                        height={height - padding * 2}
                        rx={borderRadius}
                        ry={borderRadius}
                    />
                </clipPath>
            </defs>
            <rect
                cursor={"pointer"}
                height={height}
                width={width}
                fill={"#222425"}
                stroke={"#535354"}
                strokeWidth={borderWidth}
                rx={borderRadius}
                ry={borderRadius}
            />
            {children}
        </Box>
    );
};
