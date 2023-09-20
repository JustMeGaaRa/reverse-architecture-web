import { Box, Heading, IconButton } from "@chakra-ui/react";
import { Cancel } from "iconoir-react";
import { FC } from "react";

export const ContextSheetTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <Heading
            as={"h5"}
            fontSize={24}
            fontWeight={"normal"}
            noOfLines={1}
        >
            {title}
        </Heading>
    )
}

export const ContextSheetCloseButton: FC = () => {
    return (
        <IconButton
            aria-label={"close context sheet"}
            colorScheme={"gray"}
            icon={<Cancel />}
            title={"close context sheet"}
            variant={"ghost"}
            onClick={() => { }}
        />
    )
}