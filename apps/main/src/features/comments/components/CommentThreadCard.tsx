import {
    Avatar,
    Box,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack
} from "@chakra-ui/react";
import {
    Bin,
    Xmark,
    Check,
    NavArrowLeft,
    NavArrowRight,
    Send
} from "iconoir-react";
import { FC, useRef } from "react";
import { useAccount } from "../../authentication";
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
    const commentRef = useRef<HTMLInputElement>(null);
    const { account } = useAccount();
    
    return (
        <Flex
            backgroundColor={"gray.300"}
            borderColor={"gray.400"}
            borderWidth={1}
            borderRadius={16}
            direction={"column"}
            maxHeight={"500px"}
            maxWidth={"300px"}
            paddingX={1}
            paddingY={2}
        >
            <Flex marginX={1}>
                <ButtonGroup
                    colorScheme={"gray"}
                    gap={"2px"}
                    spacing={0}
                    flex={1}
                    justifyContent={"start"}
                    size={"xs"}
                    variant={"tonal"}
                >
                    <IconButton
                        aria-label={"previous comment"}
                        icon={<Icon as={NavArrowLeft} boxSize={4} />}
                        title={"previous comment"}
                        onClick={() => onPrevious?.()}
                    />
                    <IconButton
                        aria-label={"next comment"}
                        icon={<Icon as={NavArrowRight} boxSize={4} />}
                        title={"next comment"}
                        onClick={() => onNext?.()}
                    />
                </ButtonGroup>
                <ButtonGroup
                    colorScheme={"gray"}
                    gap={"2px"}
                    spacing={0}
                    flex={1}
                    justifyContent={"end"}
                    size={"xs"}
                    variant={"tonal"}
                >
                    <IconButton
                        aria-label={"mark as resolved"}
                        icon={<Icon as={Check} boxSize={4} />}
                        title={"mark as resolved"}
                        onClick={() => onResolve?.()}
                    />
                    <IconButton
                        aria-label={"delete thread"}
                        icon={<Icon as={Bin} boxSize={4} />}
                        title={"delete thread"}
                        onClick={() => onDelete?.()}
                    />
                    <IconButton
                        aria-label={"close"}
                        icon={<Icon as={Xmark} boxSize={4} />}
                        title={"close"}
                        onClick={() => onClose?.()}
                    />
                </ButtonGroup>
            </Flex>
            <Box
                backgroundColor={"surface.tinted-white-5"}
                borderRadius={16}
                marginY={2}
                padding={1}
                overflowY={"scroll"}
            >
                <VStack gap={6}>
                    {commentThread.comments.map((comment) => (
                        <Flex key={comment.commentId} gap={2} width={"100%"}>
                            <Avatar
                                // TODO: replace with current user color scheme
                                colorScheme={"blue"}
                                name={comment.author}
                                size={"sm"}
                                title={comment.author}
                            />
                            <Flex direction={"column"} gap={1}>
                                <Flex alignItems={"center"}>
                                    <Text color={"basic.white"} flex={2} textAlign={"start"} textStyle={"b3"}>
                                        {comment.author}
                                    </Text>
                                    <Text color={"gray.700"} flex={1} textAlign={"end"} marginRight={2} textStyle={"b5"}>
                                        {comment.createdDate}
                                    </Text>
                                </Flex>
                                <Text color={"gray.900"} marginRight={2} textStyle={"b4"}>
                                    {comment.text}
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </VStack>
            </Box>
            <Flex marginX={1} gap={1}>
                <Avatar
                    colorScheme={"purple"}
                    name={account.fullname}
                    size={"sm"}
                    title={account.fullname}
                />
                <InputGroup size={"sm"}>
                    <Input
                        ref={commentRef}
                        borderRadius={"8px"}
                        placeholder={"Reply..."}
                        onKeyDown={(event) => event.key === "Enter" && onReply?.(event.currentTarget.value)}
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label={"send comment"}
                            colorScheme={"gray"}
                            icon={<Icon as={Send} boxSize={4} />}
                            size={"xs"}
                            title={"send comment"}
                            variant={"tonal"}
                            onClick={() => onReply?.(commentRef?.current?.value ?? "")}
                        />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Flex>
    )
}