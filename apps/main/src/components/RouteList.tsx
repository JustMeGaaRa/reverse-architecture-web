import { ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const RouteList: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <ButtonGroup
            orientation={"vertical"}
            size={"lg"}
            variant={"ghost"}
            width={"100%"}
        >
            {children}
        </ButtonGroup>
    )
}