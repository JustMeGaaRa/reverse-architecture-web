import { ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteList: FC<PropsWithChildren<{
    size?: "sm" | "md" | "lg",
}>> = ({
    children,
    size = "md"
}) => {
    return (
        <ButtonGroup
            colorScheme={"lime"}
            orientation={"vertical"}
            size={size}
            spacing={1}
            variant={"menuitem"}
            width={"100%"}
        >
            {children}
        </ButtonGroup>
    )
}