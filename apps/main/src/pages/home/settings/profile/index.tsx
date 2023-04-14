import { Box, Divider } from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { FC } from "react";

export const ProfileSheet: FC<{

}> = ({

}) => {
    return (
        <ContextSheet>
            <Box>
                <ContextSheetHeader title={"Profile"} />
                <Divider />
                <ContextSheetContent>

                </ContextSheetContent>
            </Box>
        </ContextSheet>
    );
};