import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ShellHeader: FC<PropsWithChildren<{
    backgroundColor?: string;
    outlineRadius?: [number, number, number, number];
    padding?: number;
}>> = ({
    children,
    backgroundColor,
    outlineRadius,
    padding
}) => {
    return (
        <Flex
            className={"restruct__shell-header"}
            backgroundColor={backgroundColor ?? "none"}
            boxSizing={"border-box"}
            borderTopLeftRadius={outlineRadius?.at(0) ?? 0}
            borderTopRightRadius={outlineRadius?.at(1) ?? 0}
            borderBottomRightRadius={outlineRadius?.at(2) ?? 0}
            borderBottomLeftRadius={outlineRadius?.at(3) ?? 0}
            direction={"row"}
            alignItems={"center"}
            flexBasis={16}
            flexGrow={0}
            flexShrink={0}
            justifyContent={"space-between"}
            gap={3}
            padding={padding ?? 4}
            position={"relative"}
            height={16}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}