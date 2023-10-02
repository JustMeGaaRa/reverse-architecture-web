import { Button, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Route: FC<{
    to: string,
    icon: any,
    title?: string,
    isDisabled?: boolean,
    isExpanded?: boolean
}> = ({
    to,
    icon,
    title,
    isDisabled = false,
    isExpanded = false
}) => {
    return isExpanded ? (
        <Button
            as={isDisabled ? undefined : NavLink}
            aria-label={title ?? to}
            isDisabled={isDisabled}
            leftIcon={icon}
            justifyContent={"left"}
            cursor={isDisabled ? "none" : "pointer"}
            paddingLeft={"11px"}
            to={to}
            title={title}
            transitionProperty={"all"}
            transitionDuration={"normal"}
            transitionTimingFunction={"ease"}
            width={"100%"}
            _active={{
                backgroundColor: "whiteAlpha.100",
                color: "yellow.900",
            }}
            _activeLink={{
                backgroundColor: "whiteAlpha.100",
                color: "yellow.900",
            }}
        >
            {title}
        </Button>
    ) : (
        <IconButton
            as={isDisabled ? undefined : NavLink}
            aria-label={title ?? to}
            icon={icon}
            isDisabled={isDisabled}
            cursor={isDisabled ? "none" : "pointer"}
            to={to}
            title={title}
            transitionProperty={"all"}
            transitionDuration={"normal"}
            transitionTimingFunction={"ease"}
            _active={{
                backgroundColor: "whiteAlpha.100",
                color: "yellow.900",
            }}
            _activeLink={{
                backgroundColor: "whiteAlpha.100",
                color: "yellow.900",
            }}
        />
    )
}