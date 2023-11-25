import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetHeader: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            boxSizing={"border-box"}
            direction={"row"}
            alignItems={"center"}
            flexBasis={14}
            flexGrow={0}
            flexShrink={0}
            height={14}
            position={"relative"}
            gap={3}
            paddingX={6}
            paddingY={4}
        >
            {children}
        </Flex>
    )
}