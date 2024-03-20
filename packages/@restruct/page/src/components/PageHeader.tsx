import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageHeader } from "../hooks";
import { createPortal } from "react-dom";

export const PageHeader: FC<PropsWithChildren> = ({ children}) => {
    const { headerOptions } = usePageHeader();
    const { height } = headerOptions;

    return (
        <Flex
            className={"restruct__page-header"}
            direction={"row"}
            alignItems={"center"}
            height={`${height}px`}
            width={"100%"}
            position={"relative"}
        >
            {children}
        </Flex>
    )
}

export const PageHeaderSectionOutlet: FC<{
    section: "start" | "center" | "end"
}> = ({
    section
}) => {
    return (
        <Flex
            id={`restruct__header-section-${section}`}
            flex={1}
            justifyContent={section}
        />
    )
}

export const PageHeaderSectionPortal: FC<PropsWithChildren<{
    section: "start" | "center" | "end"
}>> = ({
    children,
    section
}) => {
    const domNode = document.getElementById(`restruct__header-section-${section}`);
    return !domNode ? null : createPortal(children, domNode);
}