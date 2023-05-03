import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetContent: FC<PropsWithChildren<{
    padding?: number
}>> = ({
    children,
    padding = 6
}) => {
    return (
        <Box
            boxSizing={"border-box"}
            padding={padding}
            height={"calc(100% - 80px)"}
        >
            {children}
        </Box>
    )
}