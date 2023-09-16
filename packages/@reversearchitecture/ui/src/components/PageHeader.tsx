import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageContext } from "./PageProvider";

export const PageHeader: FC<PropsWithChildren> = ({ children}) => {
    const { headerHeight } = usePageContext();

    return (
        <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexGrow={0}
            flexShrink={0}
            flexBasis={`${headerHeight}px`}
            minHeight={`${headerHeight}px`}
            height={`${headerHeight}px`}
        >
            {children}
        </Flex>
    )
}