import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheet: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Box
            backgroundColor={"gray.50"}
            borderRadius={"24px 0px 0px 0px"}
            borderLeftWidth={1}
            borderTopWidth={1}
            borderColor={"gray.200"}
            width={"100%"}
            height={"100%"}
            position={"relative"}
        >
            {children}
        </Box>
    )
}