import {
    Box,
    Button,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { ShellTitle } from "@restruct/ui";
import { ChatLines, Send } from "iconoir-react";
import { FC, useCallback, useRef } from "react";
import {
    CommentGroup,
    CommentInfo,
    CommentNonInteractiveCard
} from "../../comments";

export const TemplateSectionDiscussion: FC<{
    isLoading?: boolean;
    comments: Array<CommentInfo>;
    onComment?: (comment: string) => void;
}> = ({
    isLoading,
    comments,
    onComment
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnCommentKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputRef?.current?.value) {
            onComment?.(inputRef.current.value);
            inputRef.current.value = "";
        }
    }, [onComment]);

    const handleOnCommentSendClick = useCallback(() => {
        if (inputRef?.current?.value) {
            onComment?.(inputRef.current.value);
            inputRef.current.value = "";
        }
    }, [onComment]);

    return (
        <>
            <ShellTitle title={"Comments"} />
            <Box
                padding={2}
                height={"100%"}
                width={"100%"}
                overflowY={"scroll"}
            >
                <InputGroup marginBottom={6}>
                    <InputLeftElement>
                        <Icon as={ChatLines} boxSize={5} />
                    </InputLeftElement>
                    <Input
                        ref={inputRef}
                        placeholder={"Share your thoughts"}
                        onKeyDown={handleOnCommentKeyDown}
                    />
                    <InputRightElement>
                        <Button
                            aria-label={"send"}
                            size={"sm"}
                            variant={"tonal"}
                            onClick={handleOnCommentSendClick}
                        >
                            Send
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <CommentGroup>
                    {comments.map((comment, index) => (
                        <CommentNonInteractiveCard
                            key={index}
                            comment={comment}
                            showAvatar={true}
                            showOptions={true}
                        />
                    ))}
                </CommentGroup>
            </Box>
        </>
    );
}