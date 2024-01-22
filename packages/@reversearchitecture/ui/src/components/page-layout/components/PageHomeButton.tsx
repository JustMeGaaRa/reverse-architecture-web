import { Flex, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { usePageSidebar } from "../hooks";

export const PageHomeButton: FC<{
    isExpanded?: boolean,
    icon: FC<{}>,
    title: string,
    onClick?: () => void
}> = ({
    isExpanded,
    icon,
    title,
    onClick
}) => {
    const { sidebarOptions } = usePageSidebar();

    return (
        <Flex
            aria-label={"home button"}
            cursor={"pointer"}
            padding={1}
            alignItems={"center"}
            title={"home button"}
            onClick={onClick}
        >
            <Icon as={icon} boxSize={5} />
            {(sidebarOptions.isOpen || isExpanded) && (
                <Text
                    color={"lime.600"}
                    fontFamily={"Formula condensed"}
                    marginX={2}
                    textStyle={"b2"}
                >
                    {title}
                </Text>
            )}
        </Flex>
    )
}