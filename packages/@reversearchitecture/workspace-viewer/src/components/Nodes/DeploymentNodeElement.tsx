import { Flex } from "@chakra-ui/react";
import { NodeResizer } from "@reactflow/node-resizer";
import {
    DeploymentNode,
    ElementStyleProperties
} from "@structurizr/dsl";
import { FC } from "react";
import { DeploymentNodeLabel } from "./DeploymentNodeLabel";

export const DeploymentNodeElement: FC<{
    data: DeploymentNode;
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
    return (
        <Flex
            background={style.background}
            borderWidth={style.strokeWidth}
            borderColor={style.stroke}
            align={"end"}
            justify={"start"}
            padding={2}
            width={width}
            height={height}
            textColor={style.color}
        >
            <DeploymentNodeLabel
                data={data}
                style={style}
            />
            <NodeResizer
                isVisible={selected}
                minWidth={380}
                minHeight={320}
                handleStyle={{ width: 7, height: 7 }}
                lineStyle={{ borderWidth: 0 }}
                // onResize={onResize}
            />
        </Flex>
    );
}