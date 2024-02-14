import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetBody: FC<PropsWithChildren<{
    backgroundColor?: string;
    padding?: number;
}>> = ({
    children,
    backgroundColor,
    padding
}) => {
    return (
        <Box
            backgroundColor={backgroundColor ?? "none"}
            boxSizing={"border-box"}
            borderRadius={24}
            flexGrow={1}
            overflow={"hidden"}
            padding={padding ?? 0}
            height={"100%"}
            width={"100%"}
        >
            {children}
        </Box>
    )
}