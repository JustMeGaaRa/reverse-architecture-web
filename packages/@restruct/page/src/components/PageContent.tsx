import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            className={"restruct__page-content"}
            height={"100%"}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}