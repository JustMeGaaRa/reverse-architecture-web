import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { IElement, IElementStyleProperties } from "@structurizr/dsl";
import { FC } from "react";
import { formatElementTag, formatElementTechnology } from "../../utils";

export const ElementLabel: FC<{
    element: IElement;
    style?: Partial<IElementStyleProperties>;
    showDescription?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}> = ({
    element,
    style,
    showDescription,
    onMouseEnter,
    onMouseLeave
}) => {
    return (
        <VStack
            arial-label={"element label"}
            align={"center"}
            alignContent={"center"}
            color={style.color}
            gap={0}
            spacing={0}
            height={"100%"}
            justify={"center"}
            width={"100%"}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Box
                flexGrow={0}
                padding={"10px"}
                textAlign={"center"}
                height={"40px"}
                width={"100%"}
            >
                <Text
                    color={"gray.1000"}
                    noOfLines={1}
                    textStyle={"b3"}
                    title={element.name}
                >
                    {element.name}
                </Text>
            </Box>
            <Box
                flexGrow={0}
                paddingX={"10px"}
                textAlign={"center"}
                height={"14px"}
                width={"100%"}
            >
                <Text
                    color={"gray.700"}
                    noOfLines={1}
                    textStyle={"b5"}
                >
                    {formatElementTag(element)}
                </Text>
            </Box>
            <Box
                flexGrow={1}
                marginY={2}
                paddingX={2}
                paddingY={1}
                textAlign={"center"}
                width={"100%"}
            >
                {showDescription && element.description && (
                    <Text
                        color={"gray.1000"}
                        textStyle={"b4"}
                        noOfLines={5}
                        title={element.description}
                    >
                        {element.description}
                    </Text>
                )}
            </Box>
            <HStack
                flexGrow={0}
                justify={"center"}
                paddingX={2}
                paddingY={1}
                height={"24px"}
                width={"100%"}
            >
                <Text
                    color={"gray.400"}
                    textStyle={"b4"}
                    noOfLines={1}
                >
                    {formatElementTechnology(element)}
                </Text>
            </HStack>
        </VStack>
    );
}
