import { FC, PropsWithChildren } from "react";
import { Text } from "./components";

export interface IElement {
    type: string;
    identifier: string;
    name: string;
    description?: string;
    technology?: string;
}

// TODO: make position, height and width required
export const Element: FC<{
    value: IElement;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
}> = ({
    value,
    position = { x: 0, y: 0 },
    height = 200,
    width = 200,
    borderWidth = 2,
    borderRadius = 16,
    padding = 4,
}) => {
    return (
        <g
            id={value.identifier}
            transform={`translate(${position.x}, ${position.y})`}
        >
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
            <Text
                x={borderWidth + width / 2}
                y={borderWidth + padding + 20}
                fontSize={14}
                fontFamily={"Inter"}
                fill={"#E8E8E8"}
                clipPath={"url(#clip)"}
                style={{ whiteSpace: "pre" }}
                textAnchor={"middle"}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.name}
            </Text>
            <Text
                x={borderWidth + width / 2}
                y={borderWidth + padding + 48}
                fontSize={11}
                fontFamily={"Inter"}
                fill={"#A1A2A3"}
                clipPath={"url(#clip)"}
                style={{ whiteSpace: "pre" }}
                textAnchor={"middle"}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.type}
            </Text>
            <Text
                x={borderWidth + width / 2}
                y={borderWidth + padding + 74}
                fontSize={12}
                fontFamily={"Inter"}
                fill={"#E8E8E8"}
                clipPath={"url(#clip)"}
                style={{ whiteSpace: "pre" }}
                textAnchor={"middle"}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.description}
            </Text>
            <Text
                x={borderWidth + width / 2}
                y={height - padding - 12}
                fontSize={12}
                fontFamily={"Inter"}
                fill={"#535354"}
                clipPath={"url(#clip)"}
                style={{ whiteSpace: "pre" }}
                textAnchor={"middle"}
                width={width - padding * 2 - borderWidth * 2}
            >
                {value.technology}
            </Text>
        </g>
    );
};

export interface IBoundary {
    type: string;
    name: string;
}

export const Boundary: FC<PropsWithChildren<{
    value: IBoundary;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
}>> = ({
    children,
    value,
    position = { x: 0, y: 0 },
    height = 400,
    width = 400,
    borderWidth = 2,
    borderRadius = 32,
    padding = 16,
}) => {
    return (
        <g transform={`translate(${position.x}, ${position.y})`}>
            <rect
                cursor={"pointer"}
                height={height}
                width={width}
                fill={"#161819"}
                stroke={"#535354"}
                strokeDasharray={"20 10"}
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
        </g>
    );
};

export interface IGroup {
    type: string;
    name: string;
}

export const Group: FC<PropsWithChildren<{
    value: IGroup;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
    padding?: number;
}>> = ({
    children,
    value,
    position = { x: 0, y: 0 },
    height = 400,
    width = 400,
    borderWidth = 2,
    borderRadius = 32,
    padding = 16,
}) => {
    return (
        <g transform={`translate(${position.x}, ${position.y})`}>
            <rect
                cursor={"pointer"}
                height={height}
                width={width}
                fill={"none"}
                stroke={"#535354"}
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
        </g>
    );
};
