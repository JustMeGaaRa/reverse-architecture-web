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

export const PageSidebarSectionOutlet: FC<PropsWithChildren<{
    section: "start" | "center" | "end"
}>> = ({
    children,
    section
}) => {
    const { sidebarOptions } = usePageSidebar();

    return (
        <Flex direction={"column"} flex={1} justifyContent={section}>
            {section === "start" && sidebarOptions.sections.top}
            {section === "center" && sidebarOptions.sections.middle}
            {section === "end" && sidebarOptions.sections.bottom}
            {children}
        </Flex>
    )
}