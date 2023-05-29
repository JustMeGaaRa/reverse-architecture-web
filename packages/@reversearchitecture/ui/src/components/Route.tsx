import { ListIcon, ListItem } from "@chakra-ui/react";
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
    return (
        <ListItem
            as={NavLink}
            aria-label={title ?? to}
            display={"block"}
            className={isDisabled ? "disabled" : ""}
            to={to}
            title={title}
        >
            <ListIcon as={icon} />
            {isExpanded && title}
        </ListItem>
    )
}