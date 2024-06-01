import { FC } from "react";
import { Boundary } from "./Element";
import { Group } from "./Group";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IInfrastructureNode {
    type: "Infrastructure Node";
    identifier: string;
    name: string;
    description?: string;
    instances?: string;
}

export const InfrastructureNode: FC<{
    value: IInfrastructureNode;
}> = ({
    value,
}) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 350,
        width: 300,
    };

    return (
        <Boundary
            value={value}
            position={dimensions}
            height={dimensions.height}
            width={dimensions.width}
            backgroundColor={"none"}
            borderColor={"#535354"}
            borderDash={false}
        />
    );
};
