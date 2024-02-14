import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetPanel: FC<PropsWithChildren<{
    width?: string;
}>> = ({
    children,
    width
}) => {
    return (
        <Flex direction={"column"} width={width}>
            {children}
        </Flex>
    )
}