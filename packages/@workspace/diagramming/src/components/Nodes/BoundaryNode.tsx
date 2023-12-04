import { Flex } from "@chakra-ui/react";
import { useReactFlow } from "@reactflow/core";
import { NodeResizer } from "@reactflow/node-resizer";
import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC, useCallback } from "react";
import { HexColor } from "../../utils";
import { BoundaryLabel } from "./BoundaryLabel";

export const BoundaryNode: FC<{
    data: IElement;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean,
}> = ({
    data,
    style,
    width,
    height,
    selected,
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
        <Flex
            backgroundColor={HexColor.withAlpha(style.background, 0.1)}
            backdropFilter={"auto"}
            backdropBlur={"16px"}
            border={"dashed"}
            borderWidth={2}
            borderColor={HexColor.withAlpha(style.stroke, 0.4)}
            cursor={"pointer"}
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={style.color}
            _hover={{
                borderColor: HexColor.withAlpha(style.stroke, 0.7),
            }}
        >
            <BoundaryLabel
                data={data}
                style={style}
            />
            <NodeResizer
                isVisible={selected}
                color={style.stroke}
                minWidth={380}
                minHeight={320}
                handleStyle={{
                    borderWidth: 1,
                    borderColor: HexColor.withAlpha(style.stroke, 0.7),
                    borderRadius: 2,
                    width: 7,
                    height: 7,
                }}
                lineStyle={{ borderWidth: 1 }}
                onResize={onResize}
            />
        </Flex>
    );
}
