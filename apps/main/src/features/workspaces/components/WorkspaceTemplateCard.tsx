import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Icon,
    IconButton,
    Text,
} from "@chakra-ui/react";
import { ArrowTrCircle, BookmarkEmpty, ThumbsUp } from "iconoir-react";
import { FC, PropsWithChildren, useCallback } from "react";
import { ThumbnailContainer, ThumbnailSelector, WorkspaceCardHeader } from "../components";
import { WorkspaceInfo } from "../types";

export const WorkspaceTemplateCard: FC<PropsWithChildren<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
    onTryItClick?: () => void;
    onBookmarkClick?: () => void;
    onLikeClick?: () => void;
}>> = ({
    workspace,
    onPreviewClick,
    onTryItClick,
    onBookmarkClick,
    onLikeClick
}) => {
    const handleOnTryItClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onTryItClick?.();
    }, [onTryItClick]);

    const handleOnBookmarkClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onBookmarkClick?.();
    }, [onBookmarkClick]);

    const handleOnLikeClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onLikeClick?.();
    }, [onLikeClick]);

    return (
        <Card data-group>
            <CardHeader>
                <WorkspaceCardHeader
                    name={workspace.name}
                    createdBy={workspace.createdBy}
                    usedCount={788}
                    likedCount={47}
                />
            </CardHeader>
            <CardBody>
                <ThumbnailContainer onClick={onPreviewClick}>
                    <ThumbnailSelector data={workspace}>
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
                                        icon={<Icon as={BookmarkEmpty} />}
                                        title={"bookmark template"}
                                        onClick={handleOnBookmarkClick}
                                    />
                                    <IconButton
                                        aria-label={"like template"}
                                        icon={<Icon as={ThumbsUp} />}
                                        title={"like template"}
                                        onClick={handleOnLikeClick}
                                    />
                                </ButtonGroup>
                                <ButtonGroup gap={2} spacing={0} size={"sm"} variant={"tonal"}>
                                    <Button
                                        leftIcon={<Icon as={ArrowTrCircle} />}
                                        iconSpacing={0}
                                        onClick={handleOnTryItClick}
                                    >
                                        <Text marginX={1}>Try it out</Text>
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        </Flex>
                    </ThumbnailSelector>
                </ThumbnailContainer>
            </CardBody>
        </Card>
    )
}