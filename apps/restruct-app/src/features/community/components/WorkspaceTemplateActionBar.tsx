import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { WorkspacePanel } from "@workspace/core";
import { IWorkspaceInfo } from "@structurizr/y-workspace";
import { ArrowUpRightCircle, Heart, UserCircle } from "iconoir-react";
import { FC } from "react";

export const WorkspaceTemplateActionBar: FC<{
    workspace: IWorkspaceInfo;
    isLoading?: boolean;
    onTryItClick?: () => void;
}> = ({
    workspace,
    isLoading,
    onTryItClick
}) => {
    return (
        <WorkspacePanel position={"bottom-left"} spacing={2}>                                                
            <Box backgroundColor={"gray.100"} borderRadius={24} width={"600px"}>
                <Flex padding={2} alignItems={"center"} gap={2}>
                    <SkeletonCircle isLoaded={!isLoading} size={"48px"}>
                        <Avatar
                            colorScheme={"purple"}
                            name={workspace?.createdBy}
                            size={"lg"}
                            title={workspace?.createdBy}
                        />
                    </SkeletonCircle>
                    <Flex direction={"column"} flexGrow={1} gap={1}>
                        <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                            <Text color={"white"} lineHeight={"24px"} textStyle={"h6"}>
                                {workspace?.name}
                            </Text>
                        </Skeleton>
                        <Flex direction={"row"} gap={4} lineHeight={"14px"}>
                            <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                                <Text color={"whiteAlpha.700"} textStyle={"b5"} alignSelf={"flex-start"}>
                                    {workspace?.createdBy}
                                </Text>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                                <Tag variant={"unstyled"} height={"14px"} size={"xs"}>
                                    <TagLeftIcon as={UserCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                    <TagLabel textStyle={"b5"}>{`${workspace?.statistics?.used ?? 0} used`}</TagLabel>
                                </Tag>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoading} borderRadius={"md"}>
                                <Tag variant={"unstyled"} height={"14px"} size={"xs"}>
                                    <TagLeftIcon as={Heart} height={"12px"} width={"12px"} marginInlineEnd={1} />
                                    <TagLabel textStyle={"b5"}>{`${workspace?.statistics?.liked ?? 0} liked`}</TagLabel>
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
        </WorkspacePanel>
    )
}