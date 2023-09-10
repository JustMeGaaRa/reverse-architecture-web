import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

export const ContextSheetHeader: FC<{ title: string }> = ({ title }) => {
    return (
        <Box
            boxSizing={"border-box"}
            padding={6}
            height={"80px"}
        >
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