import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <Box padding={6}>
            <Heading
                as={"h4"}
                fontSize={32}
                noOfLines={1}
            >
                {title}
            </Heading>
        </Box>
    )
}