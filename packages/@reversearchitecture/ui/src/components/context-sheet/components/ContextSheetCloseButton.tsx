import { Icon, IconButton } from "@chakra-ui/react";
import { Xmark } from "iconoir-react";
import { FC } from "react";

export const ContextSheetCloseButton: FC<{
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
}> = ({
    size = "md",
    onClick
}) => {
    return (
        <IconButton
            aria-label={"close context sheet"}
            colorScheme={"gray"}
            icon={<Icon as={Xmark} boxSize={6} />}
            size={size}
            title={"close context sheet"}
            variant={"tonal"}
            onClick={onClick}
        />
    )
}