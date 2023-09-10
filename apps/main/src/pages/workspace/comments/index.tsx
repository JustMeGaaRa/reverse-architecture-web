import {
    Box,
    Divider,
    Flex,
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetContent,
    ContextSheetHeader
} from "@reversearchitecture/ui";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkspaceViewerSheet } from "../viewer";
import {
    CommentsProvider,
    CommentThread,
    IComment
} from "../../../containers";
import { CommentApi } from "../../../services";

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
                <CommentsProvider>
                    <Box width={"400px"}>
                        <ContextSheetHeader title={"All Comments"} />
                        <Divider />
                        <ContextSheetContent padding={0}>
                            <Box overflowY={"scroll"} height={"100%"}>
                                <CommentThread comments={comments} />
                            </Box>
                        </ContextSheetContent>
                    </Box>
                    <WorkspaceViewerSheet />
                </CommentsProvider>
            </Flex>
        </ContextSheet>
    );
};