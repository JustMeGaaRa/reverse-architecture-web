import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageContext } from "./PageProvider";

export const PageSidebar: FC<PropsWithChildren<{
    isOpen?: boolean
}>> = ({
    children,
    isOpen
}) => {
    const { sidebarWidth } = usePageContext();
    const [ sidebarCollapsedWidth, sidebarExpandedWidth ] = sidebarWidth;
    const width = isOpen ? sidebarExpandedWidth : sidebarCollapsedWidth;
    
    return (
        <Flex
            direction={"column"}
            justifyContent={"space-between"}
            height={"100%"}
            flexGrow={0}
            flexShrink={0}
            flexBasis={`${width}px`}
            minWidth={`${width}px`}
        >
            {children}
        </Flex>
    )
}