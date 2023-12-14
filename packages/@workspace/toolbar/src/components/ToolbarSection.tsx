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
            className={"workspace-toolbar__section"}
            colorScheme={"lime"}
            gap={1}
            orientation={"horizontal"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            spacing={0}
            size={size}
            variant={"toolitem"}
        >
            {children}
        </ButtonGroup>
    )
}