import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetContent: FC<PropsWithChildren<{
    padding?: number
}>> = ({
    children,
    padding = 6
}) => {
    return (
        <Box padding={padding}>
            {children}
        </Box>
    )
}