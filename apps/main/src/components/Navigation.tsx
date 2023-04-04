import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Navigation: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Flex
            direction={"row"}
            height={"100%"}
        >
            {children}
        </Flex>
    )
}