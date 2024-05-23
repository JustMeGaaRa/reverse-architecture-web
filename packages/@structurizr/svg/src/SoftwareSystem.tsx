import { Children, FC, PropsWithChildren } from "react";
import { ZoomControls } from "./containers";
import { Boundary, Element } from "./Element";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface ISoftwareSystem {
    type: "Software System";
    identifier: string;
    name: string;
    description?: string;
    technology?: string;
}

export const SoftwareSystem: FC<PropsWithChildren<{
    value: ISoftwareSystem;
    position?: { x: number; y: number };
    height?: number;
    width?: number;
    borderWidth?: number;
    borderRadius?: number;
}>> = ({
    children,
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

    return Children.count(children) > 0 ? (
        <ZoomControls position={dimensions}>
            <Boundary
                value={value}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                height={dimensions.height}
                width={dimensions.width}
            >
                {children}
            </Boundary>
        </ZoomControls>
    ) : (
        <ZoomControls position={dimensions}>
            <Element
                value={value}
                borderRadius={borderRadius}
                borderWidth={borderWidth}
                height={dimensions.height}
                width={dimensions.width}
            />
        </ZoomControls>
    );
};
