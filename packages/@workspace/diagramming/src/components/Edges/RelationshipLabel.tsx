import { Text, VStack } from "@chakra-ui/react";
import { Relationship, IRelationshipStyleProperties } from "@structurizr/dsl";
import { FC } from "react";

export const RelationshipLabel: FC<{
    data: Relationship;
    selected?: boolean;
    style?: Partial<IRelationshipStyleProperties>;
}> = ({
    data,
    selected,
    style,
}) => {
    return (
        <VStack
            align={"center"}
            // TODO: handle color from theme
            color={selected ? "whiteAlpha.900" : "whiteAlpha.800"}
            spacing={1}
        >
            {data.description && (
                <Text
                    fontSize={"xs"}
                    noOfLines={3}
                    textAlign={"center"}
                >
                    {data.description}
                </Text>
            )}
            {/* {data.technology && data.technology.length > 0 && (
                <HStack>
                    {data.technology.map(tag => (
                        <Box
                            key={tag.name}
                            borderColor={"whiteAlpha.700"}
                            borderWidth={"1px"}
                            borderRadius={"8px"}
                            color={"whiteAlpha.700"}
                            fontSize={"12px"}
                            height={"18px"}
                            lineHeight={"16px"}
                            paddingX={"8px"}
                            
                            // fontSize={"x-small"}
                            // noOfLines={1}
                            // textAlign={"center"}
                        >
                            {tag.name}
                        </Box>
                    ))}
                </HStack>
            )} */}
        </VStack>
    );
}