import { Button, ButtonGroup, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { ArrowUpRightCircle, Bookmark, ThumbsUp } from "iconoir-react";
import { FC } from "react";

export const WorkspaceCardActionBar: FC<{
    isBookmarked?: boolean;
    isLiked?: boolean;
    onTryItClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onBookmarkClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onLikeClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({
    isBookmarked,
    isLiked,
    onTryItClick,
    onBookmarkClick,
    onLikeClick
}) => {
    return (
        <Flex
            position={"absolute"}
            padding={1}
            bottom={0}
            width={"100%"}
            display={"none"}
            _groupHover={{ display: "flex" }}
        >
            <Flex
                backgroundColor={"surface.tinted-black-40"}
                backdropFilter={"blur(32px)"}
                borderRadius={16}
                justifyContent={"space-between"}
                padding={1}
                width={"100%"}
            >
                <ButtonGroup gap={2} spacing={0} size={"sm"} variant={"tonal"}>
                    <IconButton
                        aria-label={"boomark template"}
                        color={isBookmarked ? "lime.600" : "gray.900"}
                        icon={<Icon as={Bookmark} boxSize={5} />}
                        title={"bookmark template"}
                        onClick={onBookmarkClick}
                    />
                    <IconButton
                        aria-label={"like template"}
                        color={isLiked ? "lime.600" : "gray.900"}
                        icon={<Icon as={ThumbsUp} boxSize={5} />}
                        title={"like template"}
                        onClick={onLikeClick}
                    />
                </ButtonGroup>
                <ButtonGroup gap={2} spacing={0} size={"sm"} variant={"tonal"}>
                    <Button
                        leftIcon={<Icon as={ArrowUpRightCircle} boxSize={5} />}
                        iconSpacing={0}
                        onClick={onTryItClick}
                    >
                        <Text marginX={1}>Try it out</Text>
                    </Button>
                </ButtonGroup>
            </Flex>
        </Flex>
    )
}