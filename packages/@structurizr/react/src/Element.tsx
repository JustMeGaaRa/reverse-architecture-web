import { FC } from "react";
import { Node, Text } from "./components";

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
    padding?: number;
}> = ({
    value,
    position = { x: 0, y: 0 },
    height = 200,
    width = 200,
    borderWidth = 2,
    padding = 4,
}) => {
    return (
        <Node id={value.identifier} position={position}>
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
        </Node>
    );
};
