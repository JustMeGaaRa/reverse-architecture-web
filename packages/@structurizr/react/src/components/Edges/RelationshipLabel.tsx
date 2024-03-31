import { Text, VStack } from "@chakra-ui/react";
import { IRelationshipStyleProperties, IRelationship } from "@structurizr/dsl";
import { FC } from "react";

export const RelationshipLabel: FC<{
    relationship: IRelationship;
    isSelected?: boolean;
    style?: Partial<IRelationshipStyleProperties>;
}> = ({
    relationship,
    isSelected,
    style,
}) => {
    return (
        <VStack
            align={"center"}
            // TODO: handle color from theme
            color={isSelected ? "whiteAlpha.900" : "whiteAlpha.800"}
            spacing={1}
        >
            {relationship.description && (
                <Text
                    fontSize={"xs"}
                    noOfLines={3}
                    textAlign={"center"}
                >
                    {relationship.description}
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