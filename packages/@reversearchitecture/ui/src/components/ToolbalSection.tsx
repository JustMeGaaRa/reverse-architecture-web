import { ButtonGroup } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ToolbalSection: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
            <ButtonGroup
                colorScheme={"gray"}
                gap={0}
                orientation={"horizontal"}
                spacing={0}
                size={"md"}
                variant={"ghost"}
            >
                {children}
            </ButtonGroup>
    )
}