import { Flex, IconButton } from "@chakra-ui/react";
import { Menu } from "iconoir-react";
import { FC } from "react";

export const NavigationSidebarToggle: FC<{
    onClick: () => void
}> = ({
    onClick
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            width={"80px"}
        >
            <IconButton
                aria-label={"navigation sidebar toggle"}
                icon={<Menu />}
                variant={"ghost"}
                onClick={onClick}
            />
        </Flex>
    )
}