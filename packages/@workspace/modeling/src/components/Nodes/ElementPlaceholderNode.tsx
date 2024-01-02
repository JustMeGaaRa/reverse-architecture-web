import { Box, Flex, Text } from "@chakra-ui/react";
import { IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export const ElementPlaceholderNode: FC<PropsWithChildren<{
    element: IElement;
    elementChildrenCount?: number;
}>> = ({
    children,
    element,
    elementChildrenCount
}) => {
    return (
        <Box
            backgroundColor={"grayAlpha.200"}
            backdropFilter={"blur(32px)"}
            borderColor={"gray.400"}
            borderRadius={16}
            borderWidth={2}
            height={"70px"}
            width={"300px"}
            padding={1}
        >
            <Box padding={"10px"}>
                <Text color={"gray.1000"} textStyle={"b3"}>
                    {element.name}
                </Text>
            </Box>
            <Flex justifyContent={"space-between"} paddingX={"10px"} paddingBottom={"8px"}>
                <Text color={"gray.800"} textStyle={"b5"}>
                    {element.tags.at(1).name}
                </Text>
                <Text color={"gray.800"} textStyle={"b5"}>
                    {elementChildrenCount}
                </Text>
            </Flex>
            {children}
        </Box>
    )
}