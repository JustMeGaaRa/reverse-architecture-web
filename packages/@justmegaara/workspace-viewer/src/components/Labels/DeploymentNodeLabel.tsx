import { Flex, Text } from "@chakra-ui/react";
import { DeploymentNode, ElementStyleProperties } from "@justmegaara/structurizr-dsl";
import { FC } from "react";
import { ExpandedElementLabel } from "./ExpandedElementLabel";

export type DeploymentNodeLabelProps = {
    data: DeploymentNode;
    style?: Partial<ElementStyleProperties>;
}

export const DeploymentNodeLabel: FC<DeploymentNodeLabelProps> = ({
    data,
    style
}) => {
    return (
        <Flex
            align={"flex-end"}
            color={style.color}
            justify={"space-between"}
            width={"100%"}
        >
            <ExpandedElementLabel
                data={data}
                style={style}
            />
            {data.instances && (
                <Text
                    fontSize={"xx-large"}
                    lineHeight={1}
                >
                    {`x${data.instances}`}
                </Text>
            )}
        </Flex>
    );
}