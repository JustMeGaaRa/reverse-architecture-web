import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Page: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            backgroundColor={"basic.eerie-black"}
            direction={"row"}
            height={"100vh"}
            width={"100vw"}
            overflow={"hidden"}
        >
            {children}
        </Flex>
    )
}