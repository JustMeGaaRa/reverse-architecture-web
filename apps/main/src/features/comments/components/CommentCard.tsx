import { Avatar, ButtonGroup, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { useWorkspaceTheme } from "@workspace/core";
import { Check, MoreHoriz } from "iconoir-react";
import { FC } from "react";
import { CommentInfo } from "../types";

export const CommentCard: FC<{
    comment: CommentInfo;
    replyCount?: number;
    origin?: { type: string; id: string; };
    colorScheme?: string;
    isSelected?: boolean;
    showAvatar?: boolean;
    showOrigin?: boolean;
    showResolve?: boolean;
    showOptions?: boolean;
    showReplies?: boolean;
    onClick?: () => void;
    onResolve?: () => void;
}> = ({
    comment,
    replyCount,
    origin,
    colorScheme,
    isSelected,
    showAvatar,
    showOrigin,
    showResolve,
    showOptions,
    showReplies,
    onClick,
    onResolve
}) => {
    return (
        <Flex
            data-group
            aria-selected={isSelected}
            direction={"column"}
            borderRadius={"16px"}
            cursor={"pointer"}
            paddingTop={1}
            paddingRight={1}
            paddingBottom={2}
            paddingLeft={3}
            width={"100%"}
            _hover={{
                backgroundColor: "surface.tinted-white-5",
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            }}
            _active={{
                backgroundColor: "surface.tinted-white-2",
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            }}
            _selected={{
                backgroundColor: "surface.tinted-white-5",
                backdropFilter: "blur(32px)",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            }}
            onClick={onClick}
        >
            <CommentNonInteractiveCard
                comment={comment}
                replyCount={replyCount}
                origin={origin}
                colorScheme={colorScheme}
                showAvatar={showAvatar}
                showOrigin={showOrigin}
                showResolve={showResolve}
                showOptions={showOptions}
                showReplies={showReplies}

            />
        </Flex>
    )
}

export const CommentNonInteractiveCard: FC<{
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
            direction={"column"}
            borderRadius={"16px"}
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
                <Text color={"gray.900"} textStyle={"b3"} paddingRight={2} paddingY={2}>
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
                <Flex flex={1} justifyContent={"end"} paddingRight={2}>
                    <Text color={"gray.700"} textStyle={"b5"}>
                        {comment.createdDate}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}