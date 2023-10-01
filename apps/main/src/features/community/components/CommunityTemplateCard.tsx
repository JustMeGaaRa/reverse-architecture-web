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
            backgroundColor={"transparent"}
            borderRadius={16}
            boxShadow={"none"}
            padding={1}
            _hover={{
                backgroundColor: "whiteAlpha.100",
                cursor: "pointer",
            }}
        >
            <CardHeader padding={1}>
                <Flex>
                    <Avatar
                        colorScheme={"purple"}
                        name={workspace.createdBy}
                        size={"md"}
                        title={workspace.createdBy}
                    />
                    <Flex direction={"column"} px={2}>
                        <Text color={"basic.white"} fontSize={14}>
                            {workspace.name}
                        </Text>
                        <Text color={"whiteAlpha.700"} fontSize={12}>
                            {workspace.createdBy}
                        </Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody px={0} py={1}>
                <Box
                    backgroundColor={"whiteAlpha.100"}
                    borderRadius={16}
                    borderWidth={2}
                    height={"100%"}
                    width={"100%"}
                    _groupHover={{ borderColor: "yellow.900" }}
                    onClick={onPreviewClick}
                >
                    <AspectRatio ratio={2/1}>
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
            <CardFooter
                padding={1}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <HStack color={"whiteAlpha.700"} spacing={1}>
                    <Tag height={"32px"} size={"lg"} variant={"unstyled"} title={"788 used"}>
                        <TagLeftIcon as={UserCircle} />
                        <TagLabel>788 used</TagLabel>
                    </Tag>
                    <Tag height={"32px"} size={"lg"} variant={"unstyled"} title={"47 liked"}>
                        <TagLeftIcon as={Heart} />
                        <TagLabel>47 liked</TagLabel>
                    </Tag>
                </HStack>
                <Button
                    colorScheme={"gray"}
                    leftIcon={<ArrowTrCircle />}
                    paddingRight={4}
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => onUseTemplateClick?.()}
                >
                    Use
                </Button>
            </CardFooter>
        </Card>
    )
}

