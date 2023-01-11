import { FC } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Abstraction } from "../types";

export const formatNodeTechnologies = (data: Abstraction) => {
    return data.technologies
        ? `[${data.type.name}: ${data.technologies.join(", ")}]`
        : `[${data.type.name}]`;
};

export type C4AbstractionInfoProps = {
    data: Abstraction;
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
                {data.title}
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
