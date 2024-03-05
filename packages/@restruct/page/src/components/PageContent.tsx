import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
    console.log("page content")
    
    return (
        <Flex
            className={"restruct__page-content"}
            flexGrow={1}
            height={"100%"}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}