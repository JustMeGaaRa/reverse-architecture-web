import { FC, useEffect, useState } from "react";
import { Box, ConnectorId, MarkerType, Text, useBox, useViewport, Viewbox } from "./components";
import { calculateCenterPosition, getSvgElementByClassName, getSvgElementById } from "./utils";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IRelationship {
    identifier: string;
    sourceIdentifier: string;
    targetIdentifier: string;
    description?: string;
}

function getPlacement(
    source: { x: number; y: number },
    target: { x: number; y: number }
) {
    const horizontalDiff = Math.abs(source.x - target.x);
    const verticalDiff = Math.abs(source.y - target.y);

    const placement: ConnectorId = horizontalDiff > verticalDiff
        ? (source.x > target.x ? "middle-left" : "middle-right")
        : (source.y > target.y ? "top-center" : "bottom-center");

    return placement;
}

export const Relationship: FC<{
    value: IRelationship;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
}> = ({
    value,
    stroke = "#535354",
    strokeWidth = 2,
    fill = "#E8E8E8"
}) => {
    const { metadata } = useViewMetadata();
    const { zoom, viewbox } = useViewport();
    const { getAbsolutePosition } = useBox();
    const [path, setPath] = useState(undefined);
    const [labelCenter, setLabelCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const bendingPoints = metadata?.relationships?.[value.identifier] ?? [];
        const absolutePosition = getAbsolutePosition();
        
        const sourceNode = getSvgElementById(value.sourceIdentifier);
        const targetNode = getSvgElementById(value.targetIdentifier);
        const sourceCenter = calculateCenterPosition(viewbox, zoom, sourceNode);
        const targetCenter = calculateCenterPosition(viewbox, zoom, targetNode);
        const sourceConnectorPlacement = getPlacement(sourceCenter, targetCenter);
        const targetConnectorPlacement = getPlacement(targetCenter, sourceCenter);
        const sourceConnector = getSvgElementByClassName(sourceNode?.parentElement, sourceConnectorPlacement);
        const targetConnector = getSvgElementByClassName(targetNode?.parentElement, targetConnectorPlacement);
        const sourceConnectorCenter = calculateCenterPosition(viewbox, zoom, sourceConnector);
        const targetConnectorCenter = calculateCenterPosition(viewbox, zoom, targetConnector);
        const sourcePoint = {
            x: sourceConnectorCenter.x - absolutePosition.x,
            y: sourceConnectorCenter.y - absolutePosition.y,
        };
        const targetPoint = {
            x: targetConnectorCenter.x - absolutePosition.x,
            y: targetConnectorCenter.y - absolutePosition.y,
        };

        const labelCenter = {
            x: (sourcePoint.x + targetPoint.x) / 2,
            y: (sourcePoint.y + targetPoint.y) / 2,
        };
        const path = sourceNode && targetNode && bendingPoints
            .concat(targetPoint)
            .reduce(
                (path, point) => `${path} ${point.x},${point.y}`,
                `${sourcePoint.x},${sourcePoint.y}`
            );

        setPath(path);
        setLabelCenter(labelCenter);
    }, [getAbsolutePosition, metadata, value.identifier, value.sourceIdentifier, value.targetIdentifier, viewbox, zoom]);

    return (
        <Box className={"structurizr__relationship"}>
            <polyline
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={"none"}
                points={path}
                markerStart={`url(#${MarkerType.CircleOutline})`}
                markerEnd={`url(#${MarkerType.ArrowClosed})`}
            />
            <Text
                x={labelCenter.x}
                y={labelCenter.y}
                fill={fill}
                fontSize={12}
                fontFamily={"Inter"}
                textAnchor={"middle"}
                width={200}
            >
                {value.description}
            </Text>
        </Box>
    );
};
