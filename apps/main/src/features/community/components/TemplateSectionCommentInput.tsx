import {
    Button,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement
} from "@chakra-ui/react";
import { ChatLines } from "iconoir-react";
import { FC } from "react";

export const TemplateSectionCommentInput: FC<{
    onComment?: (comment: string) => void;
}> = ({
    onComment
}) => {
    return (
        <InputGroup size={"md"} variant={"filled"}>
            <InputLeftElement>
                <Icon as={ChatLines} boxSize={6} color={"gray.500"} />
            </InputLeftElement>
            <Input
                backgroundColor={"surface.tinted-black-40"}
                borderRadius={16}
                placeholder={"Share your thoughts"}
                _placeholder={{
                    color: "gray.500"
                }}
                onKeyDown={(event) => event.key === "Enter" && onComment?.(event.currentTarget.value)}
            />
            <InputRightElement>
                <Button size={"sm"} variant={"tonal"}>
                    Post
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}