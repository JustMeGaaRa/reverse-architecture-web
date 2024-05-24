import { FC, useEffect, useState } from "react";
import { MarkerType, Text } from "./components";
import { useViewMetadata } from "./ViewMetadataProvider";
import { useViewport, Viewbox } from "./ViewportProvider";

export interface IRelationship {
    identifier: string;
    sourceIdentifier: string;
    targetIdentifier: string;
    description?: string;
}

function calculateAbsolutePosition(
    viewbox: Viewbox,
    zoom: number,
    element: SVGSVGElement
) {
    if (!element) return { x: 0, y: 0 };

    const ctm = element.getCTM();
    const bbox = element.getBBox();

    if (!ctm) return { x: 0, y: 0 };

    // e / zoom + viewbox.x, f / zoom + viewbox.y
    // a: 1, b: 0, c: 0, d: 1, e: absolute x, f: absolute y
    // const x = ctm.e + bbox.x * ctm.a + bbox.y * ctm.c;
    // const y = ctm.f + bbox.x * ctm.b + bbox.y * ctm.d;
    const x = ctm.e / zoom + viewbox.x / zoom;
    const y = ctm.f / zoom + viewbox.y / zoom;
    return { x, y, height: bbox.height, width: bbox.width };
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
    const [path, setPath] = useState("");
    const [labelCenter, setLabelCenter] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const sourceElement = document.getElementById(value.sourceIdentifier) as any;
        const targetElement = document.getElementById(value.targetIdentifier) as any;
        const source = calculateAbsolutePosition(viewbox, zoom, sourceElement);
        const target = calculateAbsolutePosition(viewbox, zoom, targetElement);
        const points = metadata?.relationships?.[value.identifier] ?? [];

        const sourceOffset = {
            x: (source?.width ?? 200) / 2,
            y: (source?.height ?? 200) / 2,
        };
        const targetOffset = {
            x: (target?.width ?? 200) / 2,
            y: (target?.height ?? 200) / 2,
        };

        const sourceCenter = {
            x: source.x + sourceOffset.x,
            y: source.y + sourceOffset.y,
        };
        const targetCenter = {
            x: target.x + targetOffset.x,
            y: target.y + targetOffset.y,
        };
        const labelCenter = {
            x: (sourceCenter.x + targetCenter.x) / 2,
            y: (sourceCenter.y + targetCenter.y) / 2,
        };
        const path = points
            .concat(targetCenter)
            .reduce(
                (path, point) => `${path} L${point.x},${point.y}`,
                `M${sourceCenter.x},${sourceCenter.y}`
            );

        setPath(path);
        setLabelCenter(labelCenter);
    }, [metadata, value.identifier, value.sourceIdentifier, value.targetIdentifier, viewbox, zoom]);

    return (
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
            >
                {value.description}
            </Text>
        </g>
    );
};
