import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <Box
            as={"h5"}
            noOfLines={1}
            textStyle={"h5"}
        >
            {title}
        </Box>
    )
}