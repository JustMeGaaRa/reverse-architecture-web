import { Flex, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { usePageContext } from "./PageProvider";

export const PageHomeButton: FC<{
    icon: React.ReactElement,
    onClick?: () => void
}> = ({
    icon,
    onClick
}) => {
    const { sidebarWidth, headerHeight, isSidebarOpened } = usePageContext();
    const [ sidebarCollapsedWidth, sidebarExpandedWidth ] = sidebarWidth;
    const width = isSidebarOpened ? sidebarExpandedWidth : sidebarCollapsedWidth;
    
    return (
        <Flex
            padding={4}
        >
            <IconButton
                aria-label={"home button"}
                colorScheme={"gray"}
                icon={icon}
                size={"lg"}
                title={"home button"}
                variant={"ghost"}
                onClick={onClick}
            />
        </Flex>
    )
}