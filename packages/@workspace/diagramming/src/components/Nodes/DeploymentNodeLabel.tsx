import { Flex, Text } from "@chakra-ui/react";
import { DeploymentNode, ElementStyleProperties } from "@structurizr/dsl";
import { FC } from "react";
import { BoundaryLabel } from "./BoundaryElementLabel";

export const DeploymentNodeLabel: FC<{
    data: DeploymentNode;
    style?: Partial<ElementStyleProperties>;
}> = ({
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
            <BoundaryLabel
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