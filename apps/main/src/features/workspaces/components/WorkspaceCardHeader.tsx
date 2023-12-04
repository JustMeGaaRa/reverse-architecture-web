import {
    Avatar,
    Flex,
    HStack,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from "@chakra-ui/react";
import { ProfileCircle, ThumbsUp } from "iconoir-react";
import { FC } from "react";

export const WorkspaceCardHeader: FC<{
    name: string;
    createdBy: string;
    usedCount: number;
    likedCount: number;
}> = ({
    name,
    createdBy,
    usedCount,
    likedCount
}) => {
    return (
        <Flex padding={2} alignItems={"center"} gap={2}>
            <Avatar
                colorScheme={"purple"}
                name={createdBy}
                size={"sm"}
                title={createdBy}
            />
            <Flex direction={"column"} width={"100%"}>
                <Text color={"white"} lineHeight={"20px"} textStyle={"b3"}>
                    {name}
                </Text>
                <Flex
                    direction={"row"}
                    justifyContent={"space-between"}
                    lineHeight={"14px"}
                >
                    <Text color={"whiteAlpha.700"} textStyle={"b5"} alignSelf={"flex-start"}>
                        {createdBy}
                    </Text>
                    <HStack gap={4} height={"14px"}>
                        {/* // TODO: style the tags properly */}
                        <Tag variant={"unstyled"} size={"xs"}>
                            <TagLeftIcon as={ProfileCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                            <TagLabel textStyle={"b5"}>{`${usedCount} used`}</TagLabel>
                        </Tag>
                        <Tag variant={"unstyled"} size={"xs"}>
                            <TagLeftIcon as={ThumbsUp} height={"12px"} width={"12px"} marginInlineEnd={1} />
                            <TagLabel textStyle={"b5"}>{`${likedCount} liked`}</TagLabel>
                        </Tag>
                    </HStack>
                </Flex>
            </Flex>
        </Flex>
    )
}