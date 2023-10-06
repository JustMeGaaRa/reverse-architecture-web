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
            colorScheme={"yellow"}
            gap={0}
            orientation={"horizontal"}
            spacing={0}
            size={size}
            variant={"menuitem"}
        >
            {children}
        </ButtonGroup>
    )
}