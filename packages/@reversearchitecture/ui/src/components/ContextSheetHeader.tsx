import { Flex, HStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetHeader: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            boxSizing={"border-box"}
            direction={"row"}
            alignItems={"center"}
            flexBasis={"64px"}
            flexGrow={0}
            flexShrink={0}
            height={"64px"}
            position={"relative"}
            gap={3}
            padding={4}
        >
            {children}
        </Flex>
    )
}