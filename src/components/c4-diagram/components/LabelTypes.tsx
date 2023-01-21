import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Element, Relationship } from "../types/Diagram";

export const formatNodeTechnologies = (data: Element) => {
    return data.technology
        ? `[${data.type}: ${data.technology.join(", ")}]`
        : `[${data.type}]`;
};

export type C4AbstractionInfoProps = {
    data: Element;
    align: "start" | "center" | "end";
    showTechnologies?: boolean;
    showDescription?: boolean;
}

export const C4AbstractioInfo: FC<C4AbstractionInfoProps> = ({
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
                {showTechnologies && formatNodeTechnologies(data)}
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
};

export const formatEdgeTechnologies = (data: Relationship) => {
    return data?.technology && `[${data.technology.join(" / ")}]`;
};

export type C4RelationshipInfoProps = {
    data: Relationship;
    align: "start" | "center" | "end";
    showTitle?: boolean;
    showTechnologies?: boolean;
}

export const C4RelationshipInfo: FC<C4RelationshipInfoProps> = ({
    data,
    align,
    showTechnologies,
    showTitle
}) => {
    return (
        <VStack
            align={align}
            spacing={1}
        >
            {showTitle && data.description && (
                <Text
                    fontSize={"xs"}
                    noOfLines={3}
                    textAlign={"center"}
                    maxW={150}
                >
                    {data.description}
                </Text>
            )}
            {showTechnologies && (
                <Text
                    fontSize={"x-small"}
                    noOfLines={1}
                    textAlign={"center"}
                >
                    {formatEdgeTechnologies(data)}
                </Text>
            )}
        </VStack>
    );
};
