import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { IElement, ElementStyleProperties } from "@structurizr/dsl";
import { FC } from "react";
import { formatElementTag, formatElementTechnology } from "../../utils";

export const ElementLabel: FC<{
    data: IElement;
    showDescription?: boolean;
    isSelected?: boolean;
    style?: Partial<ElementStyleProperties>;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
}> = ({
    data,
    showDescription,
    isSelected,
    style,
    onMouseOver,
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
            onMouseOver={onMouseOver}
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
                    title={data.name}
                >
                    {data.name}
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
                    {formatElementTag(data)}
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
                {showDescription && data.description && (
                    <Text
                        color={"gray.1000"}
                        textStyle={"b4"}
                        noOfLines={5}
                        title={data.description}
                    >
                        {data.description}
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
                    {formatElementTechnology(data)}
                </Text>
            </HStack>
        </VStack>
    );
}
