import { ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ToolbarSection: FC<PropsWithChildren<{
    size?: "xs" | "sm" | "md" | "lg";
}>> = ({
    children,
    size = "md"
}) => {
    return (
        <ButtonGroup
            colorScheme={"gray"}
            gap={0}
            orientation={"horizontal"}
            spacing={0}
            size={size}
            variant={"ghost"}
        >
            {children}
        </ButtonGroup>
    )
}