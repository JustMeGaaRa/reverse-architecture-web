import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const PageBody: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            direction={"column"}
            flexGrow={1}
            height={"100%"}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}