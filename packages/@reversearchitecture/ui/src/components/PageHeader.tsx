import { Flex } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const PageHeader: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"80px"}
            px={4}
        >
            {children}
        </Flex>
    )
}