import { FC, useEffect, useState } from "react";
import { ConnectorId, MarkerType, Text, useViewport, Viewbox } from "./components";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IRelationship {
    identifier: string;
    sourceIdentifier: string;
    targetIdentifier: string;
    description?: string;
}

const defaultDimensions = { x: 0, y: 0, height: 200, width: 200 };

function getSvgElementById(identifier: string) {
    const htmlElement = document.getElementById(identifier) as HTMLElement;
    const svgElement = htmlElement instanceof SVGGraphicsElement ? htmlElement : null;
    return svgElement;
}

function getSvgElementByClassName(element: HTMLElement, className: string) {
    const htmlElement = element?.getElementsByClassName(className)[0] as HTMLElement;
    const svgElement = htmlElement instanceof SVGGraphicsElement ? htmlElement : null;
    return svgElement;
}

function calculateAbsolutePosition(
    viewbox: Viewbox,
    zoom: number,
    element: SVGGraphicsElement
) {
    if (!element) return defaultDimensions;

    const ctm = element.getCTM();
    const bbox = element.getBBox();

    if (!ctm) return defaultDimensions;

    // e / zoom + viewbox.x, f / zoom + viewbox.y
    // a: 1, b: 0, c: 0, d: 1, e: absolute x, f: absolute y
    // const x = ctm.e + bbox.x * ctm.a + bbox.y * ctm.c;
    // const y = ctm.f + bbox.x * ctm.b + bbox.y * ctm.d;
    const x = ctm.e / zoom + viewbox.x / zoom + bbox.x;
    const y = ctm.f / zoom + viewbox.y / zoom + bbox.y;
    return { x, y, height: bbox.height, width: bbox.width };
}

function calculateCenterPosition(
    viewbox: Viewbox,
    zoom: number,
    element: SVGGraphicsElement
) {
    const absolutePosition = calculateAbsolutePosition(viewbox, zoom, element);
    const centeredPosition = {
        x: absolutePosition.x + absolutePosition.width / 2,
        y: absolutePosition.y + absolutePosition.height / 2,
    };
    return centeredPosition;
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
    const [path, setPath] = useState(undefined);
    const [labelCenter, setLabelCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const points = metadata?.relationships?.[value.identifier] ?? [];
        
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

        const labelCenter = {
            x: (sourceConnectorCenter.x + targetConnectorCenter.x) / 2,
            y: (sourceConnectorCenter.y + targetConnectorCenter.y) / 2,
        };
        const path = sourceNode && targetNode && points
            .concat(targetConnectorCenter)
            .reduce(
                (path, point) => `${path} L${point.x},${point.y}`,
                `M${sourceConnectorCenter.x},${sourceConnectorCenter.y}`
            );

        setPath(path);
        setLabelCenter(labelCenter);
    }, [metadata, value.identifier, value.sourceIdentifier, value.targetIdentifier, viewbox, zoom]);

    return path && (
        <g>
            <path
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={"none"}
                d={path}
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
        </g>
    );
};
