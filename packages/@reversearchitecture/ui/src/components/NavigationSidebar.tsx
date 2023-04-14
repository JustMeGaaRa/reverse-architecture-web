import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const NavigationSidebar: FC<PropsWithChildren<{
    isExpanded: boolean
}>> = ({
    children,
    isExpanded
}) => {
    return (
        <Flex
            direction={"column"}
            justifyContent={"space-between"}
            px={2}
            width={isExpanded ? "320px" : "80px"}
        >
            {children}
        </Flex>
    )
}