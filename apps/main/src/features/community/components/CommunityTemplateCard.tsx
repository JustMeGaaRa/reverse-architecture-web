import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    HStack,
    Icon,
    Image,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from "@chakra-ui/react";
import { ArrowTrCircle, Heart, MediaImage, UserCircle } from "iconoir-react";
import { FC, PropsWithChildren } from "react";
import { WorkspaceInfo } from "../../";

export const CommunityTemplateCard: FC<PropsWithChildren<{
    workspace: WorkspaceInfo;
    onPreviewClick?: () => void;
    onUseTemplateClick?: () => void;
}>> = ({
    workspace,
    onPreviewClick,
    onUseTemplateClick
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
                                    <TagLeftIcon as={UserCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                    <TagLabel textStyle={"b5"}>788 used</TagLabel>
                                </Tag>
                                <Tag variant={"unstyled"} size={"xs"} title={"47 liked"}>
                                    <TagLeftIcon as={Heart} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                    <TagLabel textStyle={"b5"}>47 liked</TagLabel>
                                </Tag>
                            </HStack>
                        </Flex>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody padding={0}>
                <Box
                    backgroundColor={"whiteAlpha.100"}
                    borderRadius={16}
                    height={"100%"}
                    width={"100%"}
                    _groupHover={{ borderColor: "lime.600" }}
                    onClick={onPreviewClick}
                >
                    <AspectRatio ratio={440/200}>
                        <Box>
                            {workspace && (
                                <Flex
                                    backgroundColor={"whiteAlpha.100"}
                                    borderRadius={13}
                                    height={"100%"}
                                    width={"100%"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    overflow={"hidden"}
                                >
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
                                            color={"whiteAlpha.700"}
                                            fontSize={32}
                                            strokeWidth={1}
                                        />
                                    )}
                                </Flex>
                            )}
                        </Box>
                    </AspectRatio>
                </Box>
            </CardBody>
        </Card>
    )
}

