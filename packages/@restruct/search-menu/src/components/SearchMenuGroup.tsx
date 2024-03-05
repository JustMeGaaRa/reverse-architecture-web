import { Flex, Text, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const SearchMenuGroup: FC<PropsWithChildren<{
    title: string;
    rightElement: React.ReactElement;
}>> = ({
    children,
    title,
    rightElement
}) => {
    return (
        <VStack
            gap={0}
            spacing={1}
            alignItems={"start"}
            width={"100%"}
        >
            <Flex
                justifyContent={"space-between"}
                paddingX={"10px"}
                paddingY={"0px"}
                textStyle={"b4"}
                width={"100%"}
            >
                <Text color={"#B9BABA"}>{title}</Text>
                {rightElement}
            </Flex>
            {children}
        </VStack>
    )
}