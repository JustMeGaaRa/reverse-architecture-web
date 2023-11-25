import { IconButton } from "@chakra-ui/react";
import { FC } from "react";

export const PageHomeButton: FC<{
    icon: React.ReactElement,
    onClick?: () => void
}> = ({
    icon,
    onClick
}) => {
    return (
        <IconButton
            aria-label={"home button"}
            colorScheme={"gray"}
            icon={icon}
            size={"md"}
            title={"home button"}
            variant={"ghost"}
            onClick={onClick}
        />
    )
}