import { Avatar, ButtonGroup, Flex, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { useWorkspaceTheme } from "@workspace/core";
import { Check, MoreHoriz } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { CommentInfo } from "../types";

export const CommentCard: FC<{
    comment: CommentInfo;
    replyCount?: number;
    origin?: { type: string; id: string; };
    colorScheme?: string;
    showAvatar?: boolean;
    showOrigin?: boolean;
    showResolve?: boolean;
    showOptions?: boolean;
    showReplies?: boolean;
    onResolve?: () => void;
}> = ({
    comment,
    replyCount,
    origin,
    colorScheme,
    showAvatar,
    showOrigin,
    showResolve,
    showOptions,
    showReplies,
    onResolve
}) => {
    // TODO: consider removing this dependency from this component
    const { getViewAccentColor } = useWorkspaceTheme();
    
    return (
        <Flex
            data-group
            direction={"column"}
            borderRadius={"16px"}
            cursor={"pointer"}
            width={"100%"}
        >
            <Flex width={"100%"} alignItems={"center"}>
                <Flex flex={2} justifyContent={"start"} gap={2}>
                    {showAvatar && (
                        <Avatar
                            key={comment.author}
                            colorScheme={colorScheme}
                            cursor={"pointer"}
                            name={comment.author}
                            size={"xs"}
                            title={comment.author}
                        />
                    )}
                    <Text color={"basic.white"} textStyle={"b3"}>
                        {comment.author}
                    </Text>
                </Flex>
                <Flex flex={1} justifyContent={"end"}>
                    <ButtonGroup
                        colorScheme={"gray"}
                        size={"xs"}
                        variant={"ghost"}
                    >
                        {showResolve && (
                            <IconButton
                                aria-label={"mark as resolved"}
                                icon={<Icon as={Check} boxSize={5} />}
                                title={"mark as resolved"}
                                onClick={onResolve}
                            />
                        )}
                        {showOptions && (
                            <IconButton
                                aria-label={"more options"}
                                icon={<Icon as={MoreHoriz} boxSize={5} />}
                                title={"more options"}
                            />
                        )}
                    </ButtonGroup>
                </Flex>
            </Flex>
            <Flex width={"100%"}>
                {showOrigin && (
                    <Text color={`${getViewAccentColor(origin?.type as any)}.600`} textStyle={"b5"}>
                        {origin?.id ? `${origin?.type} [${origin?.id}]` : `${origin?.type}`}
                    </Text>
                )}
            </Flex>
            <Flex width={"100%"}>
                <Text color={"gray.900"} textStyle={"b3"} paddingY={2}>
                    {comment.text}
                </Text>
            </Flex>
            <Flex width={"100%"}>
                <Flex flex={1} justifyContent={"start"}>
                    {showReplies && (
                        <Text color={"red.600"} textStyle={"b5"}>
                            {`${replyCount} replies`}
                        </Text>
                    )}
                </Flex>
                <Flex flex={1} justifyContent={"end"}>
                    <Text color={"gray.700"} textStyle={"b5"}>
                        {comment.createdDate}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}