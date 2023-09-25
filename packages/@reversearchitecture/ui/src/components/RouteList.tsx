import { List } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteList: FC<PropsWithChildren> = ({
    children
}) => {
    return (
        <List
            size={"lg"}
            spacing={1}
            width={"100%"}
        >
            {children}
        </List>
    )
}