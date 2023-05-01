import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren<{

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