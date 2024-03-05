import { Box, ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const BorderTop: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            // white 10% and 0.1%
            background={"linear-gradient(rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.001))"}
            borderRadius={20}
        >
            {children}
        </Box>
    )
}

export const ButtonSegmentedToggle: FC<PropsWithChildren<{
    size?: "xs" | "sm" | "md" | "lg";
}>> = ({
    children,
    size = "sm"
}) => {
    return (
        <BorderTop>
            <ButtonGroup
                key={"workspace-page-mode"}
                backgroundColor={"surface.tinted-black-60"}
                backdropFilter={"blur(16px)"}
                borderRadius={"16px"}
                borderColor={"transparent"}
                borderWidth={1}
                boxShadow={"1px 1.5px 4px 0px rgba(0, 0, 0, 0.24) inset, 1px 1.5px 4px 0px rgba(0, 0, 0, 0.16) inset, 0px -0.5px 1px 0px rgba(255, 255, 255, 0.24) inset, 0px -0.2px 1px 0px rgba(255, 255, 255, 0.32) inset"}
                spacing={"2px"}
                padding={1}
                size={size}
                variant={"menuitem"}
            >
                {children}
            </ButtonGroup>
        </BorderTop>
    )
}