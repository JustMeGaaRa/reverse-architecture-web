import { VStack, Text } from "@chakra-ui/react";
import { Element, ElementStyleProperties, Tag } from "@structurizr/dsl";
import { FC } from "react";

export const formatExpandedTechnology = (data: Element) => {
    const type = data.tags.filter(x => x.name !== Tag.Element.name).at(0);
    if (!type) return "";
    
    return data?.technology && data?.technology.length > 0
        ? `[${type.name}: ${data.technology.map(x => x.name).join(", ")}]`
        : `[${type.name}]`;
};

export const BoundaryElementLabel: FC<{
    data: Element;
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
            >
                {data.name}
            </Text>
            {data.tags && (
                <Text
                    fontSize={"small"}
                    noOfLines={1}
                    textAlign={"center"}
                >
                    {formatExpandedTechnology(data)}
                </Text>
            )}
        </VStack>
    );
}