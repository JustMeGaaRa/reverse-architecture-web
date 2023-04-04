import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const NavigationContent: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Flex
            flexGrow={1}
        >
            {children}
        </Flex>
    )
}