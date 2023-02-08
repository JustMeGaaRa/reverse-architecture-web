import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Element } from "../../store/Diagram";

export const formatElementTechnology = (data: Element, showTechnologies?: boolean) => {
    return showTechnologies && data?.technology && data?.technology.length > 0
        ? `[${data.type}: ${data.technology.join(", ")}]`
        : `[${data.type}]`;
};

export type ElementLabelProps = {
    data: Element;
    align: "start" | "center" | "end";
    showTechnologies?: boolean;
    showDescription?: boolean;
}

export const ElementLabel: FC<ElementLabelProps> = ({
    data,
    align,
    showTechnologies,
    showDescription
}) => {
    return (
        <VStack
            align={align}
            spacing={0}
        >
            <Text
                as={"b"}
                fontSize={"md"}
                noOfLines={1}
                textAlign={"center"}
            >
                {data.name}
            </Text>
            <Text
                fontSize={"x-small"}
                noOfLines={1}
                textAlign={"center"}
            >
                {formatElementTechnology(data, showTechnologies)}
            </Text>
            {showDescription && data.description && (
                <Text
                    fontSize={"xs"}
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