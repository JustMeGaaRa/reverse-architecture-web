import { FC, PropsWithChildren } from "react";
import { Boundary } from "./components";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IGroup {
    type: string;
    identifier: string;
    name: string;
}

export const Group: FC<PropsWithChildren<{
    value: IGroup;
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
    // TODO: pass these default values to the Element component directly
    const { height = 400, width = 400 } = dimensions;

    return (
        <Boundary
            value={value}
            position={dimensions}
            height={height}
            width={width}
            backgroundColor={"none"}
            borderColor={"#535354"}
            borderDash={false}
        >
            {children}
        </Boundary>
    );
};
