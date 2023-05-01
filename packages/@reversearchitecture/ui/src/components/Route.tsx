import { ListIcon, ListItem } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Route: FC<{
    to: string,
    icon: any,
    title?: string,
    isExpanded?: boolean
}> = ({
    to,
    icon,
    title,
    isExpanded = false
}) => {
    return (
        <ListItem
            as={NavLink}
            aria-label={title ?? to}
            display={"block"}
            to={to}
            title={title}
        >
            <ListIcon data-group as={icon} />
            {isExpanded && title}
        </ListItem>
    )
}