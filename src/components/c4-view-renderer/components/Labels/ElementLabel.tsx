import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Element } from "../../../../dsl";

export const formatElementTechnology = (data: Element) => {
    // TODO: handle tags corectly
    const type = data.tags.filter(x => x.name !== "Element").at(0);
    return data?.technology && data?.technology.length > 0
        ? `[${type.name}: ${data.technology.map(x => x.name).join(", ")}]`
        : `[${type.name}]`;
};

export type ElementLabelProps = {
    data: Element;
    showDescription?: boolean;
}

export const ElementLabel: FC<ElementLabelProps> = ({
    data,
    showDescription
}) => {
    return (
        <VStack
            align={"center"}
            spacing={0}
        >
            <Text
                as={"b"}
                fontSize={"larger"}
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
                {formatElementTechnology(data)}
            </Text>
            {showDescription && data.description && (
                <Text
                    fontSize={"medium"}
                    noOfLines={3}
                    paddingTop={4}
                    textAlign={"center"}
                >
                    {data.description}
                </Text>
            )}
        </VStack>
    );
}
