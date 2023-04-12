import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { ContextSheet } from "../../../components/ContextSheet";
import { ContextSheetContent } from "../../../components/ContextSheetContent";
import { ContextSheetHeader } from "../../../components/ContextSheetHeader";
import { WorkspaceViewerSheet } from "../viewer";

export const CommentsSheet: FC<{

}> = () => {
    
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box width={"400px"}>
                    <ContextSheetHeader title={"All Comments"} />
                    <Divider />
                    <ContextSheetContent>

                    </ContextSheetContent>
                </Box>
                <WorkspaceViewerSheet />
            </Flex>
        </ContextSheet>
    );
};