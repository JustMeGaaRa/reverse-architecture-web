import { Children, FC, PropsWithChildren } from "react";
import { Boundary } from "./Boundary";
import { Box, Connector, useViewMetadata } from "./components";
import { Element } from "./Element";

export interface IContainer {
    type: "Container";
    identifier: string;
    name: string;
    description?: string;
    technology?: string;
}

export const Container: FC<PropsWithChildren<{ value: IContainer }>> = ({ children, value }) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 200,
        width: 200,
    };
    // TODO: pass these default values to the Element component directly
    const { height = 200, width = 200 } = dimensions;

    return Children.count(children) > 0 ? (
        <Box className={"structurizr__boundary-system"} position={dimensions}>
            <Boundary
                value={value}
                height={dimensions.height}
                width={dimensions.width}
            >
                {children}
            </Boundary>
        </Box>
    ) : (
        <Box className={"structurizr__element-container"} position={dimensions}>
            <Element
                value={value}
                height={dimensions.height}
                width={dimensions.width}
            />
            <Connector height={height} width={width} placement={"top-left"} />
            <Connector height={height} width={width} placement={"top-center"} />
            <Connector height={height} width={width} placement={"top-right"} />
            <Connector height={height} width={width} placement={"middle-left"} />
            <Connector height={height} width={width} placement={"middle-right"} />
            <Connector height={height} width={width} placement={"bottom-left"} />
            <Connector height={height} width={width} placement={"bottom-center"} />
            <Connector height={height} width={width} placement={"bottom-right"} />
        </Box>
    );
};
