import { Flex } from "@chakra-ui/react";
import { NodeResizer } from "@reactflow/node-resizer";
import {
    DeploymentNode as DeploymentNodeType,
    ElementStyleProperties
} from "@structurizr/dsl";
import { FC, useCallback, useState } from "react";
import { HexColor } from "../../utils";
import { DeploymentNodeLabel } from "./DeploymentNodeLabel";

export const DeploymentNode: FC<{
    data: DeploymentNodeType;
    style: ElementStyleProperties;
    width?: number;
    height?: number;
    selected?: boolean,
}> = ({
    data,
    style,
    width,
    height,
    selected
}) => {
    const [size, setSize] = useState({ width, height });
    const onResize = useCallback((event, params) => {
        setSize({
            width: params.width,
            height: params.height,
        });
    }, []);

    return (
        <Flex
            backgroundColor={HexColor.withAlpha(style.background, 0.1)}
            backdropFilter={"auto"}
            backdropBlur={"16px"}
            borderWidth={style.strokeWidth}
            borderColor={HexColor.withAlpha(style.stroke, selected ? 0.7 : 0.4)}
            cursor={"pointer"}
            align={"end"}
            justify={"start"}
            padding={2}
            width={size.width}
            height={size.height}
            textColor={style.color}
            _hover={{
                borderColor: HexColor.withAlpha(style.stroke, 0.7),
            }}
        >
            <DeploymentNodeLabel
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
                onResizeEnd={onResize}
            />
        </Flex>
    );
}