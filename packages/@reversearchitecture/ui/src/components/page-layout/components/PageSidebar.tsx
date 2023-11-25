import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageSidebar } from "../hooks";

export const PageSidebar: FC<PropsWithChildren> = ({ children }) => {
    const { sidebarOptions } = usePageSidebar();
    const [ sidebarCollapsedWidth, sidebarExpandedWidth ] = sidebarOptions.width;
    const width = sidebarOptions.isOpen ? sidebarExpandedWidth : sidebarCollapsedWidth;
    
    return (
        <Flex
            direction={"column"}
            flexGrow={0}
            flexShrink={0}
            flexBasis={`${width}px`}
            height={"100%"}
            minWidth={`${width}px`}
            width={`${width}px`}
            position={"relative"}
        >
            {children}
        </Flex>
    )
}

export const PageSidebarSection: FC<PropsWithChildren<{
    section: "start" | "center" | "end"
}>> = ({
    children,
    section
}) => {
    return (
        <Flex direction={"column"} flex={1} justifyContent={section}>
            {children}
        </Flex>
    )
}

export const PageHeaderSection: FC<PropsWithChildren<{
    section: "start" | "center" | "end"
}>> = ({
    children,
    section
}) => {
    return (
        <Flex flex={1} justifyContent={section}>
            {children}
        </Flex>
    )
}