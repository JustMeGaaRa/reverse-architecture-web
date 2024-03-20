import { Icon, IconButton } from "@chakra-ui/react";
import { Xmark } from "iconoir-react";
import { FC } from "react";

export const ShellCloseButton: FC<{
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
            className={"restruct__shell-close"}
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