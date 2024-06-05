import { FC, PropsWithChildren } from "react";
import { Box } from "./components";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IContainerInstance {
    type: "Container Instance";
    identifier: string;
    containerIdentifier: string;
}

export const ContainerInstance: FC<PropsWithChildren<{
    value: IContainerInstance;
}>> = ({
    children,
    value,
}) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 200,
        width: 200,
    };

    return (
        <Box position={dimensions} id={value.identifier}>
            {children}
        </Box>
    );
};
