import { ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteList: FC<PropsWithChildren<{
    size?: "sm" | "md" | "lg",
}>> = ({
    children,
    size = "lg"
}) => {
    return (
        <ButtonGroup
            colorScheme={"yellow"}
            size={size}
            spacing={1}
            variant={"menuitem"}
            orientation={"vertical"}
            width={"100%"}
        >
            {children}
        </ButtonGroup>
    )
}