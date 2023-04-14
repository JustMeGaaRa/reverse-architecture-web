import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteSection: FC<PropsWithChildren<{
    title: string,
    gap?: number
}>> = ({
    children,
    title,
    gap = 2
}) => {
    return (
        <Flex direction={"column"} gap={gap} py={4}>
            <Text px={3} fontSize={12} color={"gray.400"}>{title}</Text>
            {children}
        </Flex>
    )
}