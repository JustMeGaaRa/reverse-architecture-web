import {
    Box,
    Divider,
    Flex,
    VStack
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { FC, useEffect, useState } from "react";
import { WorkspaceViewerSheet } from "../viewer";
import {
    CommentsProvider,
    CommentThread,
    IComment
} from "../../../containers";
import { useParams } from "react-router-dom";
import { CommentApi } from "../../../services/CommentApi";

export const CommentsSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ comments, setComments ] = useState<Array<IComment>>([]);

    useEffect(() => {
        const api = new CommentApi();
        api.getComments(workspaceId)
            .then(comments => setComments(comments))
            .catch(error => console.error(error));
    }, [workspaceId]);
    
    return (
        <ContextSheet>
            <Flex
                direction={"row"}
                height={"100%"}
            >
                <Box width={"400px"}>
                    <ContextSheetHeader title={"All Comments"} />
                    <Divider />
                    <ContextSheetContent padding={0}>
                        <Box overflowY={"scroll"} height={"100%"}>
                            <CommentsProvider>
                                <CommentThread comments={comments} />
                            </CommentsProvider>
                        </Box>
                    </ContextSheetContent>
                </Box>
                <WorkspaceViewerSheet />
            </Flex>
        </ContextSheet>
    );
};