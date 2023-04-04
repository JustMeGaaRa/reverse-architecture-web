import { Flex, IconButton } from "@chakra-ui/react"
import { Menu } from "iconoir-react"
import { FC, PropsWithChildren } from "react"

export const NavigationSidebarToggle: FC<PropsWithChildren<{
    onClick: () => void
}>> = ({
    children,
    onClick
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            width={"80px"}
        >
            <IconButton
                aria-label={"toggle navigation sidebar"}
                icon={<Menu />}
                variant={"ghost"}
                onClick={onClick}
            />
        </Flex>
    )
}