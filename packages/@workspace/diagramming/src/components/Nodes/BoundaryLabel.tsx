import { VStack, Text } from "@chakra-ui/react";
import { IElement, IElementStyleProperties } from "@structurizr/dsl";
import { FC } from "react";
import { formatElementTag } from "../../utils";

export const BoundaryLabel: FC<{
    element: IElement;
    style?: Partial<IElementStyleProperties>;
}> = ({
    element,
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
                {element.name}
            </Text>
            <Text
                color={"gray.700"}
                noOfLines={1}
                textStyle={"b5"}
            >
                {formatElementTag(element)}
            </Text>
        </VStack>
    );
}