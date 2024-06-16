import { FC } from "react";
import { Edge, MarkerType, Text, useViewMetadata } from "./components";

export interface IRelationship {
    identifier: string;
    sourceIdentifier: string;
    targetIdentifier: string;
    description?: string;
}

export const Relationship: FC<{
    value: IRelationship;
}> = ({
    value
}) => {
    const { metadata } = useViewMetadata();

    return (
        <Edge
            id={value.identifier}
            sourceNodeId={value.sourceIdentifier}
            targetNodeId={value.targetIdentifier}
            bendingPoints={metadata?.relationships?.[value.identifier]}
            markerStart={MarkerType.CircleOutline}
            markerEnd={MarkerType.ArrowClosed}
        >
            <Text
                fill={"#E8E8E8"}
                fontSize={12}
                fontFamily={"Inter"}
                textAnchor={"middle"}
                width={200}
            >
                {value.description}
            </Text>
        </Edge>
    );
};
