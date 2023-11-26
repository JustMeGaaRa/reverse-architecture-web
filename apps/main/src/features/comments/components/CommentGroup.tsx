import { VStack } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const CommentGroup: FC<PropsWithChildren<{

}>> = ({
    children
}) => {
    return (
        <VStack
            spacing={6}
            height={"100%"}
            width={"100%"}
        >
            {children}
        </VStack>
    )
}