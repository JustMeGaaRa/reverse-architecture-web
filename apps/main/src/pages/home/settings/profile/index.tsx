import { Box, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { ContextSheet } from "../../../../components/ContextSheet";
import { ContextSheetContent } from "../../../../components/ContextSheetContent";
import { ContextSheetHeader } from "../../../../components/ContextSheetHeader";

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