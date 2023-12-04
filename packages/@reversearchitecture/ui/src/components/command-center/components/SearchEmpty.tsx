import { Flex, Highlight, Icon, Text } from "@chakra-ui/react"
import { EmojiSad } from "iconoir-react"
import { FC } from "react"

export const SearchEmpty: FC<{ query?: string }> = ({ query = "" }) => {
    return (
        <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            width={"100%"}
            textAlign={"center"}
            padding={16}
        >
            <Icon as={EmojiSad} boxSize={"72px"} color={"white"} />
            <Text textStyle={"h6"} color={"white"} mt={8}>No matches found</Text>
            <Text textStyle={"b2"} color={"gray.900"} mt={2}>
                <Highlight query={query} styles={{ color: "white" }}>
                    {`We were not able to find anything for '${query}'.`}
                </Highlight>
            </Text>
            <Text textStyle={"b2"} color={"gray.900"}>
                Try something else.
            </Text>
        </Flex>
    )
}