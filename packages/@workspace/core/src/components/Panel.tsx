import { Box, HStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Panel: FC<PropsWithChildren<{
    position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    spacing?: number;
}>> = ({
    children,
    position,
    spacing = 4,
}) => {
    const styles = {
        "top-left": {
            top: spacing,
            left: spacing
        },
        "top-center": {
            top: spacing,
            left: "50%",
            transform: "translateX(-50%)"
        },
        "top-right": {
            top: spacing,
            right: spacing
        },
        "bottom-left": {
            bottom: spacing,
            left: spacing
        },
        "bottom-center": {
            bottom: spacing,
            left: "50%",
            transform: "translateX(-50%)"
        },
        "bottom-right": {
            bottom: spacing,
            right: spacing
        }
    }

    return (
        <Box position={"absolute"} {...styles[position]}>
            <HStack spacing={spacing} padding={0}>
                {children}
            </HStack>
        </Box>
    )
}