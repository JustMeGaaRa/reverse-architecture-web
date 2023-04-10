import { Box, Divider, Heading } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ContextSheet } from "../../components/ContextSheet";

export const Dashboard: FC<PropsWithChildren<{

}>> = ({

}) => {
    return (
        <ContextSheet>
            <Box
                padding={"24px"}
                width={"100%"}
            >
                <Heading as={"h4"}>Dashboard</Heading>
                <Divider my={8} />
            </Box>
        </ContextSheet>
    );
}