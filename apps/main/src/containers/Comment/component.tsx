import {
    Box,
    ButtonGroup,
    Divider,
    Flex,
    IconButton,
    Text,
    VStack
} from "@chakra-ui/react";
import {
    useWorkspaceTheme
} from "@reversearchitecture/workspace-viewer";
import {
    CheckCircle,
    MoreHoriz
} from "iconoir-react";
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from "react";
import { CommentInfo } from "../../model";
import { CommentContext } from "./context";
import { useComments } from "./hooks";

export const Comment: FC<{
    commentId: string;
    author: string;
    source: {
        type: string;
        id: string;
    };
    text: string;
    createdAt: string;
    onClick?: (commentId?: string) => void;
}> = ({
    commentId,
    author,
    source,
    text,
    createdAt,
    onClick
}) => {
    const { getViewAccentColor } = useWorkspaceTheme();
    const { selectedCommentId } = useComments();
    const isCurrent = selectedCommentId === commentId;

    return (
        <Flex
            data-group
            backgroundColor={isCurrent ? "whiteAlpha.100" : "transparent"}
            borderRadius={"8px"}
            direction={"column"}
            padding={2}
            width={"100%"}
            _hover={{
                backgroundColor: "whiteAlpha.100"
            }}
            onClick={() => onClick?.(commentId)}
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

export const CommentThread: FC<{ comments: CommentInfo[]; }> = ({ comments: commentArray }) => {
    const {
        comments,
        selectedCommentId,
        setComments,
        setSelectedCommentId
    } = useComments();

    useEffect(() => setComments(commentArray), [commentArray, setComments]);

    const handleOnClick = useCallback((commentId?: string) => {
        const isCurrent = selectedCommentId === commentId;
        setSelectedCommentId(isCurrent ? undefined : commentId);
    }, [selectedCommentId, setSelectedCommentId]);

    return (
        <VStack padding={2} gap={1}>
            {comments.map(comment => (
                <Comment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    author={comment.author}
                    source={comment.metadata}
                    text={comment.text}
                    createdAt={comment.createdAt}
                    onClick={handleOnClick}
                />
            ))}
        </VStack>
    )
}

export const CommentsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ comments, setComments ] = useState([]);
    const [ selectedCommentId, setSelectedCommentId ] = useState<string>();

    return (
        <CommentContext.Provider
            value={{
                selectedCommentId,
                comments,
                setComments,
                setSelectedCommentId
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}