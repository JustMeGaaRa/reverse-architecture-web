import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { ExpandedElementLabel } from "./ExpandedElementLabel";
import { DeploymentNode } from "../../store/C4Diagram";

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
                    fontSize={"2xl"}
                    lineHeight={1}
                >
                    {`x${data.instances}`}
                </Text>
            )}
        </Flex>
    );
}