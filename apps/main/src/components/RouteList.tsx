import { ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteList: FC<PropsWithChildren<{
    size?: "sm" | "md" | "lg"
}>> = ({
    children,
    size = "lg"
}) => {
    return (
        <ButtonGroup
            colorScheme={"gray"}
            orientation={"vertical"}
            size={size}
            variant={"ghost"}
            width={"100%"}
        >
            {children}
        </ButtonGroup>
    )
}