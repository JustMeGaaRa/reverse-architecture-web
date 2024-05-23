import { FC, PropsWithChildren } from "react";
import { Element } from "./Element";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IPerson {
    type: "Person";
    identifier: string;
    name: string;
    description?: string;
}

export const Person: FC<PropsWithChildren<{
    value: IPerson;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
}>> = ({
    value,
    borderWidth = 2,
    borderRadius = 16
}) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 200,
        width: 200,
    };

    return (
        <Element
            value={value}
            borderRadius={borderRadius}
            borderWidth={borderWidth}
            position={dimensions}
            height={dimensions.height}
            width={dimensions.width}
        />
    );
};
