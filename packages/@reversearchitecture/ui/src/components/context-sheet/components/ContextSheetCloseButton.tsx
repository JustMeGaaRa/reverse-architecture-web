import { Icon, IconButton } from "@chakra-ui/react";
import { Xmark } from "iconoir-react";
import { FC } from "react";

export const ContextSheetCloseButton: FC<{
    isDisabled?: boolean;
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
}> = ({
    isDisabled,
    size = "sm",
    onClick
}) => {
    return (
        <IconButton
            aria-label={"close context sheet"}
            colorScheme={"gray"}
            isDisabled={isDisabled}
            icon={<Icon as={Xmark} boxSize={6} />}
            size={size}
            title={"close context sheet"}
            variant={"tonal"}
            onClick={onClick}
        />
    )
}