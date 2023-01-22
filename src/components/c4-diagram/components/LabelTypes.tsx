import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Element, Relationship } from "../types/Diagram";

const formatNodeTechnology = (data: Element) => {
    return data?.technology && data?.technology.length > 0
        ? `[${data.type}: ${data.technology.join(", ")}]`
        : `[${data.type}]`;
};

type C4ElementInfoProps = {
    data: Element;
    align: "start" | "center" | "end";
    showTechnologies?: boolean;
    showDescription?: boolean;
}

const C4ElementInfo: FC<C4ElementInfoProps> = ({
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
                {showTechnologies && formatNodeTechnology(data)}
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

const formatEdgeTechnology = (data: Relationship) => {
    return data?.technology && `[${data.technology.join(" / ")}]`;
};

type C4RelationshipInfoProps = {
    data: Relationship;
    align: "start" | "center" | "end";
    showTitle?: boolean;
    showTechnologies?: boolean;
}

const C4RelationshipInfo: FC<C4RelationshipInfoProps> = ({
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
                    {formatEdgeTechnology(data)}
                </Text>
            )}
        </VStack>
    );
};

export {
    formatNodeTechnology,
    formatEdgeTechnology,
    C4ElementInfo,
    C4RelationshipInfo,
    C4ElementInfoProps,
    C4RelationshipInfoProps
}