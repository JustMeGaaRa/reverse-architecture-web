import { FC, PropsWithChildren } from "react";
import { Box } from "./Box";

export const GroupNode: FC<PropsWithChildren<{
    position?: { x: number; y: number };
    id?: string;
    height?: number;
    width?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderDash?: boolean;
    borderWidth?: number;
    borderRadius?: number;
}>> = ({
    children,
    id,
    position = { x: 0, y: 0 },
    height = 400,
    width = 400,
    backgroundColor = "#161819",
    borderColor = "#535354",
    borderDash = true,
    borderWidth = 2,
    borderRadius = 32,
}) => {
    return (
        <Box id={id} className={"structurizr__group-node"} position={position}>
            <rect
                cursor={"pointer"}
                height={height}
                width={width}
                fill={backgroundColor}
                stroke={borderColor}
                strokeDasharray={borderDash ? "20 10" : undefined}
                strokeWidth={borderWidth}
                rx={borderRadius}
                ry={borderRadius}
            />
            {children}
        </Box>
    );
};
