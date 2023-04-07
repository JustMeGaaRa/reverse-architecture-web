import { Box, Divider, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ContextSheet } from "../../../components/ContextSheet";

export const ProfileSection: FC<{

}> = ({

}) => {
    return (
        <ContextSheet>
            <Box
                padding={"24px"}
            >
                <Heading as={"h1"} mb={8}>Profile</Heading>
                <Divider />
            </Box>
        </ContextSheet>
    );
};