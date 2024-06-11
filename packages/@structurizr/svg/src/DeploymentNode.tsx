import { FC, PropsWithChildren } from "react";
import { Group } from "./Group";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IDeploymentNode {
    type: "Deployment Node";
    identifier: string;
    name: string;
    description?: string;
    instances?: string;
}

export const DeploymentNode: FC<PropsWithChildren<{ value: IDeploymentNode }>> = ({ children, value }) => {
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
            position={dimensions}
            height={dimensions.height}
            width={dimensions.width}
        >
            {children}
        </Group>
    );
};
