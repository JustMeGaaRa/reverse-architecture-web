import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ContextSheet } from "../../../components/ContextSheet";
import { WorkspaceViewerSheet } from "../viewer";

export const CodeEditorSheet: FC<{

}> = () => {
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box
                    padding={4}
                    width={"400px"}
                >
                    <Heading as={"h6"} size={"lg"}>Code Editor</Heading>
                </Box>
                <WorkspaceViewerSheet />
            </Flex>
        </ContextSheet>
    );
};