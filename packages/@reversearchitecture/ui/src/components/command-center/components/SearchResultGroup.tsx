import { Flex, Text, VStack } from "@chakra-ui/react";
import { Children, FC, PropsWithChildren } from "react";

export const SearchResultGroup: FC<PropsWithChildren<{
    section: string;
    total: number;
}>> = ({
    children,
    section,
    total
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
                <Text color={"#B9BABA"}>{`${section} (${total})`}</Text>
                <Text color={"lime.600"}>See all</Text>
            </Flex>
            {Children.map(children, (child) => (
                <Flex
                    alignItems={"center"}
                    color={"gray.900"}
                    paddingX={"10px"}
                    paddingY={"8px"}
                    textStyle={"b2"}
                >
                    {child}
                </Flex>
            ))}
        </VStack>
    )
}