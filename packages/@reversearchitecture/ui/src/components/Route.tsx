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
            
            borderRadius={16}
            fontSize={"16px"}
            height={"48px"}
            width={"100%"}
            padding={"12px"}

            className={isDisabled ? "disabled" : ""}
            color={"gray.700"}
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
            display={"block"}
            
            transitionProperty={"all"}
            transitionDuration={"normal"}
            transitionTimingFunction={"ease"}
            to={to}
            title={title}
            
            _hover={{
                backgroundColor: "gray.100",
                color: "basic.white",
            }}
            _active={{
                backgroundColor: "gray.100",
                color: "yellow.900",
            }}
            _activeLink={{
                backgroundColor: "gray.100",
                color: "yellow.900",
            }}
            _disabled={{
                color: "gray.200",
            }}
            // "&.disabled": {
            //     color: mode("", "gray.200")(props),
            //     cursor: "not-allowed",
            // }
        >
            <ListIcon as={icon} fontSize={"24px"} />
            {isExpanded && title}
        </ListItem>
    )
}