import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import { FC } from "react";

export const TemplateSectionCommentInput: FC<{
    onComment?: (comment: string) => void;
}> = ({
    onComment
}) => {
    return (
        <InputGroup flexGrow={1} size={"sm"}>
            <Input
                borderRadius={"8px"}
                placeholder={"Reply..."}
                onKeyDown={(event) => event.key === "Enter" && onComment?.(event.currentTarget.value)}
            />
            <InputRightElement>
                <Button
                    size={"xs"}
                    variant={"tonal"}
                >
                    Post
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}