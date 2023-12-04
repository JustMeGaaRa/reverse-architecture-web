import {
    Box,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { ContextSheetTitle } from "@reversearchitecture/ui";
import { ChatLines, Send } from "iconoir-react";
import { FC, useCallback, useRef } from "react";
import {
    CommentGroup,
    CommentInfo,
    CommentNonInteractiveCard
} from "../../comments";

export const TemplateSectionDiscussion: FC<{
    comments: Array<CommentInfo>;
    onComment?: (comment: string) => void;
}> = ({
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
            <ContextSheetTitle title={"Comments"} />
            <InputGroup marginY={3} >
                <InputLeftElement>
                    <Icon as={ChatLines} boxSize={6} />
                </InputLeftElement>
                <Input
                    ref={inputRef}
                    placeholder={"Share your thoughts"}
                    onKeyDown={handleOnCommentKeyDown}
                />
                <InputRightElement>
                    <IconButton
                        aria-label={"send"}
                        icon={<Icon as={Send} boxSize={6} />}
                        size={"sm"}
                        variant={"tonal"}
                        onClick={handleOnCommentSendClick}
                    />
                </InputRightElement>
            </InputGroup>
            <Box
                marginTop={6}
                height={"100%"}
                width={"100%"}
                overflowY={"scroll"}
            >
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