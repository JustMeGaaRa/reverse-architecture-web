import { Box, Text } from "@chakra-ui/react";
import { IElement } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";

export const StartingNode: FC<PropsWithChildren<{
    element: IElement;
}>> = ({
    children,
    element
}) => {
    return (
        <Box
            backgroundColor={"gray.200"}
            borderColor={"gray.400"}
            borderRadius={16}
            borderWidth={2}
            opacity={0.4}
            height={"64px"}
            width={"400px"}
            padding={4}
        >
            <Text color={"gray.1000"} textStyle={"b4"}>
                {element.description}
            </Text>
            <Text color={"gray.800"} textStyle={"b4"}>
                {element.name}
            </Text>
            {children}
        </Box>
    )
}