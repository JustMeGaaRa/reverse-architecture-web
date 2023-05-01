import { List } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteList: FC<PropsWithChildren<{
    size?: "sm" | "md" | "lg"
}>> = ({
    children,
    size = "lg"
}) => {
    return (
        <List
            size={size}
            width={"100%"}
        >
            {children}
        </List>
    )
}