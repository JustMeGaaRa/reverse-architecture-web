import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetBody: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            boxSizing={"border-box"}
            flexGrow={1}
            overflow={"hidden"}
        >
            {children}
        </Box>
    )
}