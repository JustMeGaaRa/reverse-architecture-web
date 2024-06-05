import { Text, VStack } from "@chakra-ui/react";
import { IElement } from "@structurizr/dsl";
import { FC } from "react";

export const ElementModelLabel: FC<{
    data: IElement;
    selected?: boolean;
}> = ({
    data,
    selected,
}) => {
    return (
        <VStack
            align={"center"}
            alignContent={"center"}
            color={"white"}
            height={"100%"}
            justify={"center"}
            spacing={2}
            width={"100%"}
        >
            <Text
                fontSize={"14px"}
                noOfLines={2}
                padding={1}
                textAlign={"center"}
                width={"100%"}
            >
                {data.name}
            </Text>
            
            <Text
                fontSize={"12px"}
                noOfLines={1}
                opacity={0.4}
                textAlign={"center"}
            >
                {data.type}
            </Text>
        </VStack>
    );
}