import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Flex
            backgroundColor={"basic.eerie-black"}
            direction={"column"}
            height={"100vh"}
            overflow={"hidden"}
        >
            {children}
        </Flex>
    )
}