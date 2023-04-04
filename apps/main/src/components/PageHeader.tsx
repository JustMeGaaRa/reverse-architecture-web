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
            height={"80px"}
        >
            {children}
        </Flex>
    )
}