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
                fontSize={"medium"}
                noOfLines={1}
                textAlign={"center"}
                opacity={0.9}
            >
                {data.name}
            </Text>
            <Text
                fontSize={"small"}
                noOfLines={1}
                textAlign={"center"}
                opacity={0.4}
            >
                {formatElementTag(data)}
            </Text>
        </VStack>
    );
}