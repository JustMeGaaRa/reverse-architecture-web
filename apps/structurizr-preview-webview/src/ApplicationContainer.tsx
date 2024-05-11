import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const ApplicationContainer: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box backgroundColor={"gray.100"} height={"100vh"} width={"100vw"}>
            {children}
        </Box>
    )
}