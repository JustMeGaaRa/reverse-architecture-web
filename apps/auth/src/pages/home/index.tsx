import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Flex
            background={"basic.eerie-black"}
            direction={"column"}
            height={"100vh"}
        >
            {children}
        </Flex>
    )
}