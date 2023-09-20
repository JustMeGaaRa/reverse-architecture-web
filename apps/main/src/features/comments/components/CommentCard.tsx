import {
    ButtonGroup,
    Flex,
    IconButton,
    Text,
} from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import {
    useWorkspaceTheme
} from "@reversearchitecture/workspace-viewer";
import {
    CheckCircle,
    MoreHoriz
} from "iconoir-react";
import { FC } from "react";
import { useCommentsStore } from "../hooks";

export const CommentCard: FC<{
    commentThreadId: string;
    author: string;
    source: {
        type: string;
        id: string;
    };
    text: string;
    createdAt: string;
    onClick?: () => void;
}> = ({
    commentThreadId,
    author,
    source,
    text,
    createdAt,
    onClick
}) => {
    const { getViewAccentColor } = useWorkspaceTheme();
    const { selectedThreadId, setSelectedThreadId } = useCommentsStore();
    const isCurrent = selectedThreadId === commentThreadId;

    return (
        <Flex
            data-group
            backgroundColor={isCurrent ? "whiteAlpha.100" : "transparent"}
            borderRadius={"8px"}
            cursor={"pointer"}
            direction={"column"}
            padding={2}
            width={"100%"}
            _hover={{
                backgroundColor: "whiteAlpha.100"
            }}
            onClick={() => onClick?.()}
            onMouseEnter={() => setSelectedThreadId(commentThreadId)}
            onMouseLeave={() => setSelectedThreadId(undefined)}
        >
            <Flex justifyContent={"space-between"}>
                <Text color={"white"} fontSize={14}>{author}</Text>
                <ButtonGroup
                    colorScheme={"gray"}
                    size={"xs"}
                    variant={"ghost"}
                    visibility={"hidden"}
                    _groupHover={{ visibility: "visible" }}
                >
                    <IconButton
                        aria-label={"mark as resolved"}
                        icon={<CheckCircle />}
                        title={"Mark as resolved"}
                    />
                    <IconButton
                        aria-label={"more"}
                        icon={<MoreHoriz />}
                        title={"Mark as resolved"}
                    />
                </ButtonGroup>
            </Flex>
            <Text color={`${getViewAccentColor(source.type as any)}.900`} fontSize={12}>
                {source.id ? `${source.type} [${source.id}]` : `${source.type}`}
            </Text>
            <Text mt={2} color={"whiteAlpha.700"} fontSize={14}>
                {text}
            </Text>
            <Text color={"whiteAlpha.700"} fontSize={12} alignSelf={"flex-end"}>
                {createdAt}
            </Text>
        </Flex>
    )
}