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