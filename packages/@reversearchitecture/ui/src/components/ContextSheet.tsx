import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheet: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Flex
            backgroundColor={"whiteAlpha.50"}
            borderRadius={"24px 0px 0px 0px"}
            borderLeftWidth={1}
            borderTopWidth={1}
            borderColor={"whiteAlpha.200"}
            direction={"column"}
            height={"100%"}
            width={"100%"}
            position={"relative"}
        >
            {children}
        </Flex>
    )
}