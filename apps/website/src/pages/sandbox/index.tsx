import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router";

export const Sandbox: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();

    return (
        <Box
            height={"100vh"}
            backgroundColor={useColorModeValue("", "#1E1E1E")}
        >
        </Box>
    );
};
