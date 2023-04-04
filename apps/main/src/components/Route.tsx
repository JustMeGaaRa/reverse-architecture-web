import { Button, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Route: FC<{
    to: string,
    icon: JSX.Element,
    label?: string
    expanded?: boolean
}> = ({
    to,
    icon,
    label,
    expanded = false
}) => {
    return expanded ? (
        <Button
            as={NavLink}
            aria-label={label ?? to}
            justifyContent={"left"}
            leftIcon={icon}
            iconSpacing={4}
            px={"11px"}
            to={to}
            _activeLink={{
                bg: "whiteAlpha.200"
            }}
        >
            {label}
        </Button>
    ) : (
        <IconButton
            as={NavLink}
            aria-label={label ?? to}
            icon={icon}
            title={label}
            to={to}
            _activeLink={{
                bg: "whiteAlpha.200"
            }}
        />
    )
}