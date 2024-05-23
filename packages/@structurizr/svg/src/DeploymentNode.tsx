import { FC, PropsWithChildren } from "react";
import { Group } from "./Element";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IDeploymentNode {
    type: "Deployment Node";
    identifier: string;
    name: string;
    description?: string;
    instances?: string;
}

export const DeploymentNode: FC<PropsWithChildren<{
    value: IDeploymentNode;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
}>> = ({
    children,
    value,
    position = { x: 0, y: 0 },
    height = 200,
    width = 200,
    borderWidth = 2,
    borderRadius = 16,
}) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 350,
        width: 300,
    };

    return (
        <Group
            value={value}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            position={dimensions}
            height={dimensions.height}
            width={dimensions.width}
        >
            {children}
        </Group>
    );
};
