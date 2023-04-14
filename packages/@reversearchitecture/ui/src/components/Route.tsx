import { Button, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Route: FC<{
    to: string,
    icon: JSX.Element,
    title?: string,
    isExpanded?: boolean
}> = ({
    to,
    icon,
    title,
    isExpanded = false
}) => {
    return isExpanded ? (
        <Button
            as={NavLink}
            aria-label={title ?? to}
            justifyContent={"left"}
            leftIcon={icon}
            iconSpacing={4}
            px={"11px"}
            to={to}
            title={title}
            _activeLink={{
                backgroundColor: "gray.100",
                color: "yellow.primary"
            }}
        >
            {title}
        </Button>
    ) : (
        <IconButton
            as={NavLink}
            aria-label={title ?? to}
            icon={icon}
            title={title}
            to={to}
            _activeLink={{
                backgroundColor: "gray.100",
                color: "yellow.primary"
            }}
        />
    )
}