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
            backgroundColor={"whiteAlpha.50"}
            borderRadius={"16px"}
            gap={2}
            padding={2}
            maxWidth={"300px"}
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
                <Text fontSize={"12px"} color={"gray.900"}>
                    {comment.author}
                </Text>
                <Text fontSize={"12px"} color={"gray.700"}>
                    {comment.createdDate}
                </Text>
                <Text fontSize={"14px"} color={"gray.900"}>
                    {comment.text}
                </Text>
            </Flex>
        </Flex>
    )
}