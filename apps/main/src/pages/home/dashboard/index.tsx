import { Box, Divider } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { ContextSheet } from "../../../components/ContextSheet";
import { ContextSheetContent } from "../../../components/ContextSheetContent";
import { ContextSheetHeader } from "../../../components/ContextSheetHeader";

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