import { Box, Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { FC, PropsWithChildren } from "react";

export const Dashboard: FC<PropsWithChildren<{

}>> = ({

}) => {
    return (
        <ContextSheet>
            <Box>
                <ContextSheetHeader title={"Dashboard"} />
                <Divider />
                <ContextSheetContent>

                </ContextSheetContent>
            </Box>
        </ContextSheet>
    );
}