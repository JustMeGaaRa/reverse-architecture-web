import {
    Avatar,
    ButtonGroup,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import {
    ArrowUp,
    Bin,
    Cancel,
    Check,
    NavArrowLeft,
    NavArrowRight
} from "iconoir-react";
import { FC } from "react";
import { CommentCard } from "../components";
import { CommentThread } from "../types";

export const CommentThreadCard: FC<{
    commentThread: CommentThread;
    onReply?: (text: string, ) => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onResolve?: () => void;
    onDelete?: () => void;
    onClose?: () => void;
}> = ({
    commentThread,
    onReply,
    onPrevious,
    onNext,
    onResolve,
    onDelete,
    onClose
}) => {
    return (
        <Flex
            backgroundColor={"whiteAlpha.50"}
            backdropFilter={"blur(16px)"}
            borderColor={"whiteAlpha.400"}
            borderRadius={"16px"}
            borderWidth={1}
            direction={"column"}
            maxHeight={"500px"}
        >
            <Flex
                flexGrow={0}
                flexShrink={0}
                justifyContent={"space-between"}
                padding={2}
            >
                <ButtonGroup colorScheme={"gray"} size={"xs"} variant={"ghost"}>
                    <IconButton
                        aria-label={"previous comment"}
                        icon={<NavArrowLeft />}
                        title={"previous comment"}
                        onClick={() => onPrevious?.()}
                    />
                    <IconButton
                        aria-label={"next comment"}
                        icon={<NavArrowRight />}
                        title={"next comment"}
                        onClick={() => onNext?.()}
                    />
                </ButtonGroup>
                <ButtonGroup colorScheme={"gray"} size={"xs"} variant={"ghost"}>
                    <IconButton
                        aria-label={"mark as resolved"}
                        icon={<Check />}
                        title={"mark as resolved"}
                        onClick={() => onResolve?.()}
                    />
                    <IconButton
                        aria-label={"delete thread"}
                        icon={<Bin />}
                        title={"delete thread"}
                        onClick={() => onDelete?.()}
                    />
                    <IconButton
                        aria-label={"close"}
                        icon={<Cancel />}
                        title={"close"}
                        onClick={() => onClose?.()}
                    />
                </ButtonGroup>
            </Flex>
            <Flex overflowY={"scroll"}>
                <VStack gap={1}>
                    {commentThread.comments.map((comment) => (
                        <CommentCard key={comment.commentId} comment={comment} />
                    ))}
                </VStack>
            </Flex>
            <Flex
                flexGrow={0}
                flexShrink={0}
                gap={2}
                padding={2}
            >
                <Avatar
                    name={commentThread.comments.at(0).author}
                    size={"sm"}
                    title={commentThread.comments.at(0).author}
                />
                <InputGroup size={"sm"}>
                    <Input
                        borderRadius={"8px"}
                        placeholder={"Reply..."}
                        onKeyDown={(event) => event.key === "Enter" && onReply?.(event.currentTarget.value)}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label={"send comment"}
                            colorScheme={"gray"}
                            icon={<ArrowUp />}
                            size={"xs"}
                            title={"send comment"}
                            variant={"ghost"}
                            onClick={() => onReply?.("")}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    )
}