import { Flex, IconButton } from "@chakra-ui/react";
import { Cancel } from "iconoir-react";
import { FC } from "react";

export const ContextSheetCloseButton: FC<{
    onClick?: () => void;
}> = ({
    onClick
}) => {
    return (
        <IconButton
            aria-label={"close context sheet"}
            colorScheme={"gray"}
            icon={<Cancel />}
            title={"close context sheet"}
            variant={"tonal"}
            onClick={onClick}
        />
    )
}