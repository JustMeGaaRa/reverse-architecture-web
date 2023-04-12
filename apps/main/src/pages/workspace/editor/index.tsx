import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ContextSheet } from "../../../components/ContextSheet";
import { ContextSheetContent } from "../../../components/ContextSheetContent";
import { ContextSheetHeader } from "../../../components/ContextSheetHeader";
import { WorkspaceViewerSheet } from "../viewer";

export const CodeEditorSheet: FC<{

}> = () => {
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box width={"400px"}>
                    <ContextSheetHeader title={"Code Editor"} />
                    <Divider />
                    <ContextSheetContent>

                    </ContextSheetContent>
                </Box>
                <WorkspaceViewerSheet />
            </Flex>
        </ContextSheet>
    );
};