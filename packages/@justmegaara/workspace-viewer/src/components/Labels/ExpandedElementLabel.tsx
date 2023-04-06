import { VStack, Text } from "@chakra-ui/react";
import { Element, ElementStyleProperties } from "@justmegaara/structurizr-dsl";
import { FC } from "react";

export const formatExpandedTechnology = (data: Element) => {
    const type = data.tags.filter(x => x.name !== "Element").at(0);
    if (!type) return "";
    
    return data?.technology && data?.technology.length > 0
        ? `[${type.name}: ${data.technology.map(x => x.name).join(", ")}]`
        : `[${type.name}]`;
};

export type ExpandedElementLabelProps = {
    data: Element;
    style?: Partial<ElementStyleProperties>;
}

export const ExpandedElementLabel: FC<ExpandedElementLabelProps> = ({
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
            <Text
                fontSize={"small"}
                noOfLines={1}
                textAlign={"center"}
            >
                {formatExpandedTechnology(data)}
            </Text>
        </VStack>
    );
}