import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Relationship } from "../types";

export const formatEdgeTechnologies = (data: Relationship) => {
    return data?.technologies && `[${data.technologies.join(" / ")}]`;
};

export interface IRelationshipInfoProps {
    data: Relationship;
    align: "start" | "center" | "end";
    showTitle?: boolean;
    showTechnologies?: boolean;
}

export const C4RelationshipInfo: FC<IRelationshipInfoProps> = ({
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
            {showTitle && data.title && (
                <Text
                    fontSize={"xs"}
                    noOfLines={3}
                    textAlign={"center"}
                    maxW={150}
                >
                    {data.title}
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
