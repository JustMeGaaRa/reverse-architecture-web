import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const PageBody: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <Box
            height={"calc(100vh - 80px)"}
        >
            {children}
        </Box>
    )
}