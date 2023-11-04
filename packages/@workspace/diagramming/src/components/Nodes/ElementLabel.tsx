import { HStack, Text, VStack } from "@chakra-ui/react";
import { IElement, ElementStyleProperties, Tag as ElementTag } from "@structurizr/dsl";
import { FC } from "react";

export const formatElementTag = (data: IElement) => {
    const type = data.tags.filter(x => x.name !== ElementTag.Element.name).at(0);
    return type.name;
};

export const ElementLabel: FC<{
    data: IElement;
    showDescription?: boolean;
    selected?: boolean;
    style?: Partial<ElementStyleProperties>;
}> = ({
    data,
    showDescription,
    selected,
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
            <Text
                fontSize={"14px"}
                noOfLines={2}
                padding={1}
                textAlign={"center"}
                width={"100%"}
            >
                {data.name}
            </Text>
            
            <Text
                fontSize={"12px"}
                noOfLines={1}
                opacity={0.4}
                textAlign={"center"}
            >
                {formatElementTag(data)}
            </Text>
            {showDescription && data.description && (
                <Text
                    flexShrink={1}
                    flexGrow={2}
                    fontSize={"12px"}
                    noOfLines={4}
                    padding={1}
                    textAlign={"center"}
                    width={"100%"}
                >
                    {data.description}
                </Text>
            )}
            <HStack
                justify={"center"}
                padding={1}
                height={26}
                width={"100%"}
            >
                {data.technology && data.technology.map(tag => (
                    <Text
                        key={tag.name}
                        borderColor={"whiteAlpha.700"}
                        borderWidth={1}
                        borderRadius={"8px"}
                        color={"whiteAlpha.700"}
                        fontSize={"12px"}
                        height={"18px"}
                        lineHeight={"16px"}
                        noOfLines={1}
                        paddingX={"8px"}
                    >
                        {tag.name}
                    </Text>
                ))}
            </HStack>
        </VStack>
    );
}
