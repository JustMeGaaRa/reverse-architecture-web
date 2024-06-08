import { FC } from "react";
import { Box } from "./Box";
import { Text } from "./Text";

export interface ITreeNode {
    type: string;
    identifier: string;
    name: string;
    children?: number;
}

export const TreeNode: FC<{
    value: ITreeNode;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
}> = ({
    value,
    position = { x: 0, y: 0 },
    height = 70,
    width = 280,
    borderWidth = 2,
    borderRadius = 16,
    padding = 4,
}) => {
    return (
        <Box className={"structurizr__tree-node"} id={value.identifier} position={position}>
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
            <Text
                x={borderWidth + padding * 3}
                y={borderWidth + padding + 20}
                fontSize={14}
                fontFamily={"Inter"}
                fill={"#E8E8E8"}
                clipPath={"url(#clip)"}
                style={{ whiteSpace: "pre" }}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.name}
            </Text>
            <Text
                x={borderWidth + padding * 3}
                y={borderWidth + padding + 48}
                fontSize={11}
                fontFamily={"Inter"}
                fill={"#A1A2A3"}
                clipPath={"url(#clip)"}
                style={{ whiteSpace: "pre" }}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.type}
            </Text>
        </Box>
    );
};
