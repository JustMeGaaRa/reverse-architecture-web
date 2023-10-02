import { Avatar, Button, ButtonGroup, Flex, Input, InputGroup, Stack } from "@chakra-ui/react";
import { FC } from "react";

export const TemplateSectionCommentInput: FC<{
    author: string;
    onComment?: (comment: string) => void;
}> = ({
    author,
    onComment
}) => {
    return (
        <Flex padding={4} width={"100%"}>
            <Stack direction={"column"} gap={4} width={"100%"}>
                <Flex
                    gap={2}
                    width={"100%"}
                >
                    <Avatar
                        colorScheme={"purple"}
                        flexGrow={0}
                        flexShrink={0}
                        name={author}
                        size={"sm"}
                        title={author}
                    />
                    <InputGroup flexGrow={1} size={"sm"}>
                        <Input
                            borderRadius={"8px"}
                            placeholder={"Reply..."}
                            onKeyDown={(event) => event.key === "Enter" && onComment?.(event.currentTarget.value)}
                        />
                    </InputGroup>
                </Flex>
                <Flex justifyContent={"right"} width={"100%"}>
                    <ButtonGroup
                        colorScheme={"gray"}
                        size={"sm"}
                        variant={"outline"}
                    >
                        <Button
                            aria-label={"cancel commenting"}
                            padding={4}
                            title={"cancel commenting"}
                            onClick={() => {}}
                        >
                            Cancel
                        </Button>
                        <Button
                            aria-label={"send comment"}
                            colorScheme={"yellow"}
                            padding={4}
                            title={"send comment"}
                            onClick={() => onComment?.("")}
                        >
                            Comment
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Stack>
        </Flex>
    );
}