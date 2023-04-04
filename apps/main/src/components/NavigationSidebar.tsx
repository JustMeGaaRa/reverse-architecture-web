import { Flex } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const NavigationSidebar: FC<PropsWithChildren<{
    expanded: boolean
}>> = ({
    children,
    expanded
}) => {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            width={expanded ? "320px" : "80px"}
            px={4}
        >
            <Flex
                direction={"column"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                {children}
            </Flex>
        </Flex>
    )
}