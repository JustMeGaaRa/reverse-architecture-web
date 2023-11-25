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
            colorScheme={"lime"}
            gap={2}
            orientation={"horizontal"}
            spacing={0}
            size={size}
            variant={"toolitem"}
        >
            {children}
        </ButtonGroup>
    )
}