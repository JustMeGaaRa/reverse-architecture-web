import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ShellPanel: FC<PropsWithChildren<{
    width?: string;
}>> = ({
    children,
    width
}) => {
    return (
        <Flex className={"restruct__shell-panel"} direction={"column"} width={width}>
            {children}
        </Flex>
    )
}