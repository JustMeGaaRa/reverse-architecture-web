import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from "@chakra-ui/react";
import {
    ArrowTrCircle,
    BookmarkEmpty,
    MediaImage,
    ProfileCircle,
    ThumbsUp,
} from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { WorkspaceInfo } from "../../";

export const CommunityTemplateCard: FC<PropsWithChildren<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
}>> = ({
    workspace,
    onPreviewClick,
}) => {
    return (
        <Card
            data-group
            backgroundColor={"surface.tinted-white-5"}
            borderRadius={16}
            boxShadow={"none"}
            _hover={{
                backgroundColor: "whiteAlpha.100",
                cursor: "pointer",
            }}
            _active={{
                backgroundColor: "surface.tinted-white-2"
            }}
        >
            <CardHeader padding={0}>
                <Flex padding={2} alignItems={"center"} gap={2}>
                    <Avatar
                        colorScheme={"purple"}
                        name={workspace.createdBy}
                        size={"sm"}
                        title={workspace.createdBy}
                    />
                    <Flex direction={"column"} width={"100%"}>
                        <Text color={"basic.white"} lineHeight={"20px"} textStyle={"b3"}>
                            {workspace.name}
                        </Text>
                        <Flex direction={"row"} justifyContent={"space-between"} lineHeight={"14px"}>
                            <Text color={"whiteAlpha.700"} textStyle={"b5"} alignSelf={"flex-start"}>
                                {workspace.createdBy}
                            </Text>
                            <HStack gap={4} height={"14px"}>
                                {/* // TODO: style the tags properly */}
                                <Tag variant={"unstyled"} size={"xs"} title={"788 used"}>
                                    <TagLeftIcon as={ProfileCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                    <TagLabel textStyle={"b5"}>788 used</TagLabel>
                                </Tag>
                                <Tag variant={"unstyled"} size={"xs"} title={"47 liked"}>
                                    <TagLeftIcon as={ThumbsUp} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                    <TagLabel textStyle={"b5"}>47 liked</TagLabel>
                                </Tag>
                            </HStack>
                        </Flex>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody padding={0}>
                <AspectRatio ratio={2/1}>
                    <Box
                        position={"relative"}
                        backgroundColor={"whiteAlpha.100"}
                        borderRadius={16}
                        height={"100%"}
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        overflow={"hidden"}
                        onClick={onPreviewClick}
                    >
                        {workspace && (
                            <>
                                {workspace.coverUrl && (
                                    <Image
                                        alt={"workspace preview image"}
                                        src={workspace.coverUrl}
                                        transitionProperty={"all"}
                                        transitionDuration={"0.3s"}
                                        transitionTimingFunction={"ease"}
                                        _groupHover={{ opacity: 0.4, transform: "scale(2)" }}
                                    />
                                )}

                                {!workspace.coverUrl && (
                                    <Icon
                                        as={MediaImage}
                                        color={"gray.900"}
                                        fontSize={32}
                                        strokeWidth={1}
                                    />
                                )}
                            </>
                        )}
                        <Flex
                            position={"absolute"}
                            padding={1}
                            bottom={0}
                            width={"100%"}
                            display={"none"}
                            _groupHover={{ display: "flex" }}
                        >
                            <Flex
                                backgroundColor={"surface.tinted-black-2"}
                                backdropFilter={"blur(32px)"}
                                borderRadius={16}
                                justifyContent={"space-between"}
                                padding={1}
                                width={"100%"}
                            >
                                <ButtonGroup gap={2} spacing={0} size={"sm"} variant={"tonal"}>
                                    <IconButton
                                        aria-label={""}
                                        icon={<Icon as={BookmarkEmpty} />}
                                        title={""}
                                    />
                                    <IconButton
                                        aria-label={""}
                                        icon={<Icon as={ThumbsUp} />}
                                        title={""}
                                    />
                                </ButtonGroup>
                                <ButtonGroup gap={2} spacing={0} size={"sm"} variant={"tonal"}>
                                    <Button
                                        leftIcon={<Icon as={ArrowTrCircle} />}
                                        iconSpacing={0}
                                    >
                                        <Text marginX={1}>Try it out</Text>
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        </Flex>
                    </Box>
                </AspectRatio>
            </CardBody>
        </Card>
    )
}

