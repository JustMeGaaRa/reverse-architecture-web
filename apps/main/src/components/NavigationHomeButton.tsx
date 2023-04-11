import { Flex, IconButton } from "@chakra-ui/react";
import { HomeSimple } from "iconoir-react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const NavigationHomeButton: FC<{
    onClick?: () => void
}> = ({
    onClick
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
        >
            <IconButton
                as={NavLink}
                aria-label={"navigation home button"}
                icon={<HomeSimple />}
                size={"lg"}
                variant={"ghost"}
                to={"/"}
                onClick={onClick}
            />
        </Flex>
    )
}