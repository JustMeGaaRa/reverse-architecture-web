import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { IElement, ElementStyleProperties, Tag as ElementTag } from "@structurizr/dsl";
import { FC } from "react";

export const formatElementTag = (data: IElement) => {
    const type = data.tags.filter(x => x.name !== ElementTag.Element.name).at(0);
    return type.name;
};

export const ElementLabel: FC<{
    data: IElement;
    showDescription?: boolean;
    isSelected?: boolean;
    style?: Partial<ElementStyleProperties>;
}> = ({
    data,
    showDescription,
    isSelected,
    style
}) => {
    return (
        <VStack
            align={"center"}
            alignContent={"center"}
            color={style.color}
            height={"100%"}
            justify={"center"}
            spacing={2}
            width={"100%"}
        >
            <Box
                padding={"10px"}
                textAlign={"center"}
                width={"100%"}
            >
                <Text
                    color={"gray.1000"}
                    noOfLines={1}
                    textStyle={"b3"}
                >
                    {data.name}
                </Text>
            </Box>
            <Box
                paddingX={"10px"}
                textAlign={"center"}
                width={"100%"}
            >
                <Text
                    color={"gray.700"}
                    noOfLines={1}
                    textStyle={"b5"}
                >
                    {formatElementTag(data)}
                </Text>
            </Box>
            <Box
                paddingX={2}
                paddingY={1}
                textAlign={"center"}
                width={"100%"}
            >
                {showDescription && data.description && (
                    <Text
                        color={"gray.1000"}
                        textStyle={"b4"}
                        noOfLines={5}
                    >
                        {data.description}
                    </Text>
                )}
            </Box>
            <HStack
                justify={"center"}
                paddingX={2}
                paddingY={1}
                width={"100%"}
            >
                {data.technology && data.technology.map(tag => (
                    <Text
                        key={tag.name}
                        color={"gray.400"}
                        textStyle={"b4"}
                        noOfLines={1}
                    >
                        {tag.name}
                    </Text>
                ))}
            </HStack>
        </VStack>
    );
}
