import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageSidebar } from "../hooks";
import { createPortal } from "react-dom";

export const PageSidebar: FC<PropsWithChildren> = ({ children }) => {
    const { sidebarOptions } = usePageSidebar();
    const [ sidebarCollapsedWidth, sidebarExpandedWidth ] = sidebarOptions.width;
    const width = sidebarOptions.isOpen ? sidebarExpandedWidth : sidebarCollapsedWidth;
    
    return (
        <Flex
            className={"restruct__page-sidebar"}
            direction={"column"}
            height={"100%"}
            width={`${width}px`}
            position={"relative"}
        >
            {children}
        </Flex>
    )
}

export const PageSidebarSectionOutlet: FC<{
    section: "start" | "center" | "end"
}> = ({
    section
}) => {
    return (
        <Flex
            id={`restruct__sidebar-section-${section}`}
            direction={"column"}
            flex={1}
            justifyContent={section}
        />
    )
}

export const PageSidebarSectionPortal: FC<PropsWithChildren<{
    section: "start" | "center" | "end"
}>> = ({
    children,
    section
}) => {
    const domNode = document.getElementById(`restruct__sidebar-section-${section}`);
    return !domNode ? null : createPortal(children, domNode);
}