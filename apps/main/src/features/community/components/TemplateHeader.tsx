import { Avatar, Box, Button, Flex, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { ArrowTrCircle, Heart, UserCircle } from "iconoir-react";
import { FC } from "react";

export const TemplateHeader: FC<{
    name: string;
    createdBy: string;
    usedCount: number;
    likedCount: number;
    onTryItClick?: () => void;
}> = ({
    name,
    createdBy,
    usedCount,
    likedCount,
    onTryItClick
}) => {
    return (
        <Box backgroundColor={"gray.100"} borderRadius={24} width={"600px"}>
            <Flex padding={2} alignItems={"center"} gap={2}>
                <Avatar
                    colorScheme={"purple"}
                    name={createdBy}
                    size={"lg"}
                    title={createdBy}
                />
                <Flex direction={"column"} flexGrow={1} gap={1}>
                    <Text color={"basic.white"} lineHeight={"24px"} textStyle={"h6"}>
                        {name}
                    </Text>
                    <Flex direction={"row"} gap={4} lineHeight={"14px"}>
                        <Text color={"whiteAlpha.700"} textStyle={"b5"} alignSelf={"flex-start"}>
                            {createdBy}
                        </Text>
                        <Tag variant={"unstyled"} height={"14px"} size={"xs"}>
                            <TagLeftIcon as={UserCircle} height={"12px"} width={"12px"} marginInlineEnd={1} />
                            <TagLabel textStyle={"b5"}>{`${usedCount} used`}</TagLabel>
                        </Tag>
                        <Tag variant={"unstyled"} height={"14px"} size={"xs"}>
                            <TagLeftIcon as={Heart} height={"12px"} width={"12px"} marginInlineEnd={1} />
                            <TagLabel textStyle={"b5"}>{`${likedCount} liked`}</TagLabel>
                        </Tag>
                    </Flex>
                </Flex>
                <Button
                    colorScheme={"lime"}
                    leftIcon={<ArrowTrCircle />}
                    iconSpacing={0}
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