import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetHeader: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            boxSizing={"border-box"}
            flexBasis={"80px"}
            flexGrow={0}
            flexShrink={0}
            height={"80px"}
        >
            {children}
        </Box>
    )
}