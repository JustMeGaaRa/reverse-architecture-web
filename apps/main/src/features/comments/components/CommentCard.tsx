import { Avatar, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { CommentInfo } from "../types";

export const CommentCard: FC<{
    comment: CommentInfo;
}> = ({
    comment
}) => {
    return (
        <Flex
            borderRadius={"16px"}
            cursor={"pointer"}
            gap={2}
            padding={2}
            width={"100%"}
            _hover={{
                backgroundColor: "whiteAlpha.50"
            }}
        >
            <Flex>
                <Avatar
                    key={comment.author}
                    cursor={"pointer"}
                    name={comment.author}
                    size={"sm"}
                    title={comment.author}
                />
            </Flex>
            <Flex direction={"column"}>
                <Text fontSize={"12px"} color={"basic.white"}>
                    {comment.author}
                </Text>
                <Text fontSize={"12px"} color={"gray.700"}>
                    {comment.createdDate}
                </Text>
                <Text fontSize={"14px"} color={"gray.900"} pt={1}>
                    {comment.text}
                </Text>
            </Flex>
        </Flex>
    )
}