import { Box, Divider, Flex } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { FC } from "react";
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