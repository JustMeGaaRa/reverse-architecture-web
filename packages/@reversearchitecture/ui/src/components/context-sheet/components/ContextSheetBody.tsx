import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheetBody: FC<PropsWithChildren<{
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
        <Box
            backgroundColor={backgroundColor ?? "none"}
            boxSizing={"border-box"}
            borderTopLeftRadius={outlineRadius?.at(0) ?? 0}
            borderTopRightRadius={outlineRadius?.at(1) ?? 0}
            borderBottomRightRadius={outlineRadius?.at(2) ?? 0}
            borderBottomLeftRadius={outlineRadius?.at(3) ?? 0}
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