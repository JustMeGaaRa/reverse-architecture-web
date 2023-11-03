import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageHeader } from "../hooks";

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
    const { headerOptions } = usePageHeader();
    const { height } = headerOptions;
    
    return (
        <Flex
            flexGrow={1}
            height={`calc(100% - ${height}px)`}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}