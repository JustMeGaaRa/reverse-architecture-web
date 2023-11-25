import { Button, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink, To } from "react-router-dom";
import { usePageSidebar } from "../../../components";

export const Route: FC<{
    to?: To;
    icon: any;
    title: string;
    isActive?: boolean;
    isDisabled?: boolean;
    isExpanded?: boolean;
    onClick?: () => void;
}> = ({
    to,
    icon,
    title,
    isActive = false,
    isDisabled = false,
    isExpanded = false,
    onClick
}) => {
    const { sidebarOptions } = usePageSidebar();

    return sidebarOptions.isOpen || isExpanded ? (
        <Button
            as={to !== undefined ? NavLink : undefined}
            aria-label={title}
            isActive={isActive}
            isDisabled={isDisabled}
            leftIcon={icon}
            justifyContent={"left"}
            cursor={isDisabled ? "none" : "pointer"}
            to={to}
            title={title}
            transitionProperty={"all"}
            transitionDuration={"normal"}
            transitionTimingFunction={"ease"}
            width={"100%"}
            onClick={onClick}
        >
            {title}
        </Button>
    ) : (
        <IconButton
            as={to !== undefined ? NavLink : undefined}
            aria-label={title}
            isActive={isActive}
            icon={icon}
            isDisabled={isDisabled}
            cursor={isDisabled ? "none" : "pointer"}
            to={to}
            title={title}
            transitionProperty={"all"}
            transitionDuration={"normal"}
            transitionTimingFunction={"ease"}
            onClick={onClick}
        />
    );
}