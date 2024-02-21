import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageHeader } from "../hooks";

export const PageHeader: FC<PropsWithChildren> = ({ children}) => {
    const { headerOptions } = usePageHeader();
    const { height } = headerOptions;

    return (
        <Flex
            direction={"row"}
            alignItems={"center"}
            flexGrow={0}
            flexShrink={0}
            flexBasis={`${height}px`}
            minHeight={`${height}px`}
            height={`${height}px`}
            width={"100%"}
            position={"relative"}
        >
            {children}
        </Flex>
    )
}

export const PageHeaderSectionOutlet: FC<PropsWithChildren<{
    section: "start" | "center" | "end"
}>> = ({
    children,
    section
}) => {
    const { headerOptions } = usePageHeader();
    
    return (
        <Flex flex={1} justifyContent={section}>
            {section === "start" && headerOptions.sections.left}
            {section === "center" && headerOptions.sections.middle}
            {section === "end" && headerOptions.sections.right}
            {children}
        </Flex>
    )
}