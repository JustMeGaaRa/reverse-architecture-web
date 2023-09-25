import { Box, Flex, HStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetHeader: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            boxSizing={"border-box"}
            direction={"row"}
            alignItems={"center"}
            flexBasis={"80px"}
            flexGrow={0}
            flexShrink={0}
            height={"80px"}
            position={"relative"}
        >
            <HStack
                gap={2}
                padding={6}
                width={"100%"}
            >
                {children}
            </HStack>
        </Flex>
    )
}