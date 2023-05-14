import { VStack, Text } from "@chakra-ui/react";
import { Relationship } from "@structurizr/dsl";
import { FC } from "react";

export const formatRelationshipTechnology = (data: Relationship) => {
    return data?.technology
        && data?.technology.length > 0
        && `[${data.technology.map(x => x.name).join(" / ")}]`;
};

export type RelationshipLabelProps = {
    data: Relationship;
}

export const RelationshipLabel: FC<RelationshipLabelProps> = ({
    data
}) => {
    return (
        <VStack
            align={"center"}
            spacing={1}
        >
            {data.description && (
                <Text
                    fontSize={"xs"}
                    noOfLines={3}
                    textAlign={"center"}
                    maxW={150}
                >
                    {data.description}
                </Text>
            )}
            {data.technology && (
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