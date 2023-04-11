import { Flex, IconButton } from "@chakra-ui/react"
import { SidebarExpand, SidebarCollapse } from "iconoir-react"
import { FC, PropsWithChildren } from "react"

export const NavigationSidebarToggle: FC<PropsWithChildren<{
    isExpanded: boolean,
    onClick: () => void
}>> = ({
    isExpanded,
    onClick
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
        >
            <IconButton
                aria-label={"navigation sidebar toggle"}
                icon={isExpanded ? <SidebarCollapse /> : <SidebarExpand />}
                size={"lg"}
                variant={"ghost"}
                onClick={onClick}
            />
        </Flex>
    )
}