import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const PageBody: FC<PropsWithChildren> = ({ children }) => {
    console.log("page body")
    return (
        <Flex
            className={"restruct__page-body"}
            direction={"column"}
            flexGrow={1}
            height={"100%"}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}