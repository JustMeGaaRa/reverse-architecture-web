import { Box, Flex } from "@chakra-ui/react";
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
        >
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                paddingY={6}
                paddingLeft={6}
                paddingRight={2}
                width={"100%"}
            >
                {children}
            </Flex>
        </Flex>
    )
}