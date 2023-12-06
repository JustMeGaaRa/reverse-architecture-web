import { VStack, Text } from "@chakra-ui/react";
import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC } from "react";
import { formatElementTag } from "../../utils";

export const BoundaryLabel: FC<{
    data: IElement;
    style?: Partial<ElementStyleProperties>;
}> = ({
    data,
    style
}) => {
    return (
        <VStack
            align={"start"}
            color={style.color}
            spacing={0}
        >
            <Text
                color={"gray.1000"}
                noOfLines={1}
                textStyle={"b3"}
            >
                {data.name}
            </Text>
            <Text
                color={"gray.700"}
                noOfLines={1}
                textStyle={"b5"}
            >
                {formatElementTag(data)}
            </Text>
        </VStack>
    );
}