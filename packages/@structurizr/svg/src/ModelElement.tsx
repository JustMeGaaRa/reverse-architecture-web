import { FC } from "react";
import { Box, Connector, TreeNode } from "./components";
import { useViewMetadata } from "./ViewMetadataProvider";

export interface IModelElement {
    type: string;
    identifier: string;
    name: string;
    children?: number;
}

export const ModelElement: FC<{
    value: IModelElement;
}> = ({
    value
}) => {
    const { metadata } = useViewMetadata();
    const dimensions = metadata?.elements[value.identifier] ?? {
        x: 0,
        y: 0,
        height: 200,
        width: 200,
    };
    const height = 70;
    const width = 280;

    return (
        <Box position={dimensions}>
            <TreeNode
                value={value}
                height={height}
                width={width}
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
    )
}