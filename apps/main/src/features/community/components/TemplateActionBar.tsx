import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { ArrowUpRightCircle, Heart, UserCircle } from "iconoir-react";
import { FC } from "react";

export const TemplateActionBar: FC<{
    name: string;
    createdBy: string;
    usedCount: number;
    likedCount: number;
    isLoading?: boolean;
    onTryItClick?: () => void;
}> = ({
    name,
    createdBy,
    usedCount,
    likedCount,
    isLoading,
    onTryItClick
}) => {
    return (
        <Box backgroundColor={"gray.100"} borderRadius={24} width={"600px"}>
            <Flex padding={2} alignItems={"center"} gap={2}>
                <SkeletonCircle isLoaded={!isLoading} size={"48px"}>
                    <Avatar
                        colorScheme={"purple"}
                        name={createdBy}
                        size={"lg"}
                        title={createdBy}
                    />
                </SkeletonCircle>
                <Flex direction={"column"} flexGrow={1} gap={1}>
                    <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                        <Text color={"white"} lineHeight={"24px"} textStyle={"h6"}>
                            {name}
                        </Text>
                    </Skeleton>
                    <Flex direction={"row"} gap={4} lineHeight={"14px"}>
                        <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                            <Text color={"whiteAlpha.700"} textStyle={"b5"} alignSelf={"flex-start"}>
                                {createdBy}
                            </Text>
                        </Skeleton>
                        <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                            <Tag variant={"unstyled"} height={"14px"} size={"xs"}>
                                <TagLeftIcon as={UserCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                <TagLabel textStyle={"b5"}>{`${usedCount} used`}</TagLabel>
                            </Tag>
                        </Skeleton>
                        <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                            <Tag variant={"unstyled"} height={"14px"} size={"xs"}>
                                <TagLeftIcon as={Heart} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                <TagLabel textStyle={"b5"}>{`${likedCount} liked`}</TagLabel>
                            </Tag>
                        </Skeleton>
                    </Flex>
                </Flex>
                <Button
                    colorScheme={"lime"}
                    leftIcon={<ArrowUpRightCircle />}
                    iconSpacing={0}
                    isDisabled={isLoading}
                    size={"lg"}
                    title={"try it out"}
                    onClick={onTryItClick}
                >
                    <Text marginX={2}>Try it out</Text>
                </Button>
            </Flex>
        </Box>
    )
}