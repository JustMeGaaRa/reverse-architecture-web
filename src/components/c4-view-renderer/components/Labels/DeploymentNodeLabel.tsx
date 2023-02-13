import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ExpandedElementLabel } from "./ExpandedElementLabel";
import { DeploymentNode } from "../../../../dsl";

export type DeploymentNodeLabelProps = {
    data: DeploymentNode
}

export const DeploymentNodeLabel: FC<DeploymentNodeLabelProps> = ({
    data
}) => {
    return (
        <Flex
            justify={"space-between"}
            align={"flex-end"}
            width={"100%"}
        >
            <ExpandedElementLabel data={data} />
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