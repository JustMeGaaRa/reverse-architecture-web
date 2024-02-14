import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetHeader: FC<PropsWithChildren<{
    backgroundColor?: string;
    justifyContent?: string;
}>> = ({
    children,
    backgroundColor,
    justifyContent
}) => {
    return (
        <Flex
            backgroundColor={backgroundColor ?? "none"}
            boxSizing={"border-box"}
            borderRadius={24}
            direction={"row"}
            alignItems={"center"}
            flexBasis={16}
            flexGrow={0}
            flexShrink={0}
            justifyContent={justifyContent ?? "flex-start"}
            gap={3}
            padding={2}
            position={"relative"}
            height={16}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}