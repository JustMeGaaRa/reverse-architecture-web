import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageContext } from "./PageProvider";

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
    const { headerHeight } = usePageContext();
    
    return (
        <Flex
            flexGrow={1}
            height={`calc(100% - ${headerHeight}px)`}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}