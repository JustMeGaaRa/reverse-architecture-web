import { Box, Heading } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const Dashboard: FC<PropsWithChildren<{

}>> = ({

}) => {
    return (
        <Box
            padding={"24px"}
        >
            <Heading as={"h1"} mb={8}>Dashboard</Heading>
        </Box>
    );
}