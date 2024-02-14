import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetTabContent: FC<PropsWithChildren<{
    gap?: number;
    padding?: number;
}>> = ({
    children,
    gap,
    padding
}) => {
    return (
        <Flex
            direction={"row"}
            height={"100%"}
            gap={gap ?? 0}
            padding={padding ?? 0}
        >
            {children}
        </Flex>
    )
}