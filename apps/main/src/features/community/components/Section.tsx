import { Flex } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const Section: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            backgroundColor={"whiteAlpha.50"}
            borderRadius={"16px"}
            width={"100%"}
        >
            {children}
        </Flex>
    )
}