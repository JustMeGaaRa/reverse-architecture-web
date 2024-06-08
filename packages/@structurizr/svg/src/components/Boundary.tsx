import { FC, PropsWithChildren } from "react";
import { Box } from "./Box";
import { Text } from "./Text";

export interface IBoundary {
    type: string;
    name: string;
}

export const Boundary: FC<PropsWithChildren<{
    value: IBoundary;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderDash?: boolean;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
}>> = ({
    children,
    value,
    position = { x: 0, y: 0 },
    height = 400,
    width = 400,
    backgroundColor = "#161819",
    borderColor = "#535354",
    borderDash = true,
    borderWidth = 2,
    borderRadius = 32,
    padding = 16,
}) => {
    return (
        <Box position={position}>
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
            <Text
                x={borderWidth + padding}
                y={height - borderWidth - padding - 16}
                fontSize={14}
                fontFamily={"Inter"}
                fill={"#E8E8E8"}
                style={{ whiteSpace: "pre" }}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.name}
            </Text>
            <Text
                x={borderWidth + padding}
                y={height - borderWidth - padding}
                fontSize={11}
                fontFamily={"Inter"}
                fill={"#A1A2A3"}
                style={{ whiteSpace: "pre" }}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.type}
            </Text>
            {children}
        </Box>
    );
};
