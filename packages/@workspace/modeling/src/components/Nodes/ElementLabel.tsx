import { Text, VStack } from "@chakra-ui/react";
import { IElement, Tag } from "@structurizr/dsl";
import { FC } from "react";

export const formatElementTag = (data: IElement) => {
    const type = data.tags?.filter(x => x.name !== Tag.Element.name).at(0);
    return type?.name;
};

export const ElementLabel: FC<{
    data: IElement;
    selected?: boolean;
}> = ({
    data,
    selected,
}) => {
    return (
        <VStack
            align={"center"}
            alignContent={"center"}
            color={"basic.white"}
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
        </VStack>
    );
}