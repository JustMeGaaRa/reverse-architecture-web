import { Box, Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren, useMemo } from "react";
import { usePageSidebar } from "../hooks";

export const PageSidebar: FC<PropsWithChildren> = ({ children }) => {
    const { sidebarOptions } = usePageSidebar();
    const [ sidebarCollapsedWidth, sidebarExpandedWidth ] = sidebarOptions.width;
    const width = sidebarOptions.isOpen ? sidebarExpandedWidth : sidebarCollapsedWidth;
    
    return (
        <Flex
            direction={"column"}
            justifyContent={"space-between"}
            height={"100%"}
            flexGrow={0}
            flexShrink={0}
            flexBasis={`${width}px`}
            minWidth={`${width}px`}
            position={"relative"}
        >
            {children}
        </Flex>
    )
}

export const PageSidebarSection: FC<PropsWithChildren<{
    section: "top" | "middle" | "bottom"
}>> = ({
    children,
    section
}) => {
    const styles = useMemo(() => ({
        "top": {
            top: "0px",
        },
        "middle": {
            top: "50%",
            transform: "translateY(-50%)",
        },
        "bottom": {
            bottom: "0px",
        },
    }), []);

    return (
        <Box
            position={"absolute"}
            padding={4}
            width={"100%"}
            {...styles[section]}
        >
            {children}
        </Box>
    )
}

export const PageHeaderSection: FC<PropsWithChildren<{
    section: "left" | "middle" | "right"
}>> = ({
    children,
    section
}) => {
    const styles = useMemo(() => ({
        "left": {
            left: "0px",
        },
        "middle": {
            left: "50%",
            transform: "translateX(-50%)",
        },
        "right": {
            right: "0px",
        },
    }), []);

    return (
        <Box
            position={"absolute"}
            {...styles[section]}
        >
            {children}
        </Box>
    )
}