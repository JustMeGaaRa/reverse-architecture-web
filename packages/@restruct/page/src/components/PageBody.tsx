import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { usePageHeader } from "../hooks";

export const PageBody: FC<PropsWithChildren> = ({ children }) => {
    const { headerOptions } = usePageHeader();
    const { height } = headerOptions;
    
    return (
        <Flex
            className={"restruct__page-body"}
            direction={"row"}
            height={`calc(100% - ${height}px)`}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}