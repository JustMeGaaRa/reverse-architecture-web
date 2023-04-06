import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ContextSheet: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Box
            background={"#1E2022E5"}
            borderRadius={"24px 0px 0px 0px"}
            borderWidth={1}
            borderColor={"#FFFFFF1A"}
            overflow={"hidden"}
            width={"100%"}
        >
            {children}
        </Box>
    )
}