import {
    AspectRatio,
    Avatar,
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
import { ArrowTrCircle, MediaImage, Heart } from "iconoir-react";
import { FC, PropsWithChildren } from "react";

export const WorkspaceCard: FC<PropsWithChildren<{
    title: string;
    author: string;
    preview?: string;
    onPreviewClick?: () => void;
    onUseTemplateClick?: () => void;
}>> = ({
    title,
    author,
    preview,
    onPreviewClick,
    onUseTemplateClick
}) => {
    return (
        <Card
            data-group
            backgroundColor={"transparent"}
            borderRadius={24}
            boxShadow={"none"}
            padding={1}
            _hover={{
                backgroundColor: "gray.100",
                cursor: "pointer",
            }}
        >
            <CardHeader padding={1}>
                <Flex>
                    <Avatar
                        colorScheme={"purple"}
                        name={author}
                        size={"lg"}
                        title={author}
                    />
                    <Flex direction={"column"} px={2}>
                        <Text color={"gray.800"} fontSize={18}>{title}</Text>
                        <Text color={"gray.700"} fontSize={14}>{author}</Text>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody px={0} py={1} width={"100%"} overflow={"hidden"}>
                <AspectRatio ratio={40/25}>
                    <Flex
                        alignItems={"center"}
                        borderColor={"gray.200"}
                        borderRadius={16}
                        borderWidth={2}
                        height={"100%"}
                        width={"100%"}
                        justifyContent={"center"}
                        overflow={"hidden"}
                        _groupHover={{
                            borderColor: "yellow.900",
                        }}
                        onClick={() => onPreviewClick && onPreviewClick()}
                    >
                        {preview && (
                            <Image
                                alt={"Project Preview Image"}
                                src={preview}
                                transitionProperty={"all"}
                                transitionDuration={"0.3s"}
                                transitionTimingFunction={"ease"}
                                _groupHover={{ opacity: .4, transform: "scale(2)" }}
                            />
                        )}
                        {!preview && (
                            <Icon
                                as={MediaImage}
                                color={"gray.700"}
                                fontSize={32}
                                strokeWidth={1}
                                _groupHover={{ display: "none" }}
                            />
                        )}
                    </Flex>
                </AspectRatio>
            </CardBody>
            <CardFooter
                padding={1}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <HStack spacing={1}>
                    <Tag
                        backgroundColor={"gray.200"}
                        borderRadius={"full"}
                        color={"gray.700"}
                        size={"sm"}
                    >
                        <TagLabel>788 used</TagLabel>
                    </Tag>
                    <Tag
                        backgroundColor={"gray.200"}
                        borderRadius={"full"}
                        color={"gray.700"}
                        size={"sm"}
                    >
                        <TagLeftIcon as={Heart} />
                        <TagLabel>47 liked</TagLabel>
                    </Tag>
                </HStack>
                <Button
                    borderRadius={"full"}
                    colorScheme={"gray"}
                    isDisabled={!onUseTemplateClick}
                    leftIcon={<ArrowTrCircle />}
                    pr={4}
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

