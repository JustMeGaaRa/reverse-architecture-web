import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetHeader: FC<{
    title: string
}> = ({
    title
}) => {
    return (
        <Box padding={6}>
            <Heading as={"h4"} fontSize={32}>{title}</Heading>
        </Box>
    )
}