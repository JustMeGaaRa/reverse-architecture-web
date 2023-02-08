import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Relationship } from "../../store/Diagram";

export const formatRelationshipTechnology = (data: Relationship) => {
    return data?.technology && `[${data.technology.join(" / ")}]`;
};

export type RelationshipLabelProps = {
    data: Relationship;
    align: "start" | "center" | "end";
    showDescription?: boolean;
    showTechnologies?: boolean;
}

export const RelationshipLabel: FC<RelationshipLabelProps> = ({
    data,
    align,
    showDescription,
    showTechnologies
}) => {
    return (
        <VStack
            align={align}
            spacing={1}
        >
            {showDescription && data.description && (
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
                    {formatRelationshipTechnology(data)}
                </Text>
            )}
        </VStack>
    );
}