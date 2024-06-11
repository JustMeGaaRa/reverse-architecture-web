import { FC } from "react";
import { Box, Connector, Node, Text } from "./components";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IModelElement {
    type: string;
    identifier: string;
    name: string;
    children?: number;
}

export const ModelElement: FC<{
    value: IModelElement;
}> = ({
    value
}) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 200,
        width: 200,
    };
    const height = 70;
    const width = 280;
    const borderWidth = 2;
    const padding = 4;

    return (
        <Node
            id={value.identifier}
            position={dimensions}
            height={height}
            width={width}
        >
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
            <Connector height={height} width={width} placement={"top-left"} />
            <Connector height={height} width={width} placement={"top-center"} />
            <Connector height={height} width={width} placement={"top-right"} />
            <Connector height={height} width={width} placement={"middle-left"} />
            <Connector height={height} width={width} placement={"middle-right"} />
            <Connector height={height} width={width} placement={"bottom-left"} />
            <Connector height={height} width={width} placement={"bottom-center"} />
            <Connector height={height} width={width} placement={"bottom-right"} />
        </Node>
    )
}