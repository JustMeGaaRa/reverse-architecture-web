import { Box, Flex } from "@chakra-ui/react";
import { useReactFlow } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback } from "react";
import { BoundaryLabel } from "./BoundaryLabel";

export const ElementGroupNode: FC<PropsWithChildren<{
    data: IElement;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    isSelected?: boolean,
}>> = ({
    children,
    data,
    style,
    width,
    height,
    isSelected,
}) => {
    // TODO: consider using useResizeObserver
    // TODO: consider moving logic specific to reactflow outside of this component
    // TODO: set element size in the workspace view metadata
    const { setNodes } = useReactFlow();
    const onResize = useCallback((event, params) => {
        setNodes(nodes => {
            return nodes.map(node => node.id !== data.identifier
                ? node
                : {
                    ...node,
                    data: {
                        ...node.data,
                        width: params.width,
                        height: params.height,
                    },
                })
        });
    }, [data.identifier, setNodes]);

    return (
        <Box
            aria-label={"boundary outline"}
            aria-selected={isSelected}
            borderColor={"transparent"}
            borderRadius={"33px"}
            borderWidth={1}
            position={"relative"}
            _selected={{ borderColor: "lime.600" }}
        >
            <Flex
                borderColor={"gray.400"}
                borderWidth={2}
                borderRadius={32}
                align={"end"}
                justify={"start"}
                padding={4}
                width={width}
                height={height}
                textColor={style.color}
            >
                <BoundaryLabel
                    data={data}
                    style={style}
                />
                <NodeResizer
                    isVisible={isSelected}
                    color={style.stroke}
                    minWidth={300}
                    minHeight={300}
                    handleStyle={{
                        backgroundColor: "#E3FB51",
                        borderWidth: 0,
                        borderRadius: 2,
                        width: 7,
                        height: 7,
                    }}
                    lineStyle={{ borderWidth: 0 }}
                    onResize={onResize}
                />
            </Flex>
        </Box>
    )
}