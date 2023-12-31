import { Flex, Text } from "@chakra-ui/react";
import { DeploymentNode, ElementStyleProperties } from "@structurizr/dsl";
import { FC } from "react";
import { BoundaryLabel } from "./BoundaryLabel";

export const DeploymentNodeLabel: FC<{
    element: DeploymentNode;
    style?: Partial<ElementStyleProperties>;
}> = ({
    element,
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
                element={element}
                style={style}
            />
            {element.instances && (
                <Text
                    fontSize={"xx-large"}
                    lineHeight={1}
                >
                    {`x${element.instances}`}
                </Text>
            )}
        </Flex>
    );
}