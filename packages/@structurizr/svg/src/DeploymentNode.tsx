import { FC, PropsWithChildren } from "react";
import { Boundary } from "./components";
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
}>> = ({
    children,
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
        >
            {children}
        </Boundary>
    );
};
