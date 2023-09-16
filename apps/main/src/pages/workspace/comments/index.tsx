import {
    Box,
    Divider,
    Flex,
} from "@chakra-ui/react";
import {
    ContextSheet,
    ContextSheetBody,
    ContextSheetHeader,
    ContextSheetTitle
} from "@reversearchitecture/ui";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WorkspaceViewerSheet } from "../viewer";
import {
    CommentsProvider,
    CommentThread,
} from "../../../containers";
import { CommentApi } from "../../../services";
import { CommentInfo } from "../../../model";

export const CommentsSheet: FC = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [ comments, setComments ] = useState<Array<CommentInfo>>([]);

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
                        <ContextSheetHeader>
                            <ContextSheetTitle title={"All Comments"} />
                        </ContextSheetHeader>

                        <Divider />

                        <ContextSheetBody>
                            <Box overflowY={"scroll"} height={"100%"}>
                                <CommentThread comments={comments} />
                            </Box>
                        </ContextSheetBody>
                    </Box>
                    <WorkspaceViewerSheet />
                </CommentsProvider>
            </Flex>
        </ContextSheet>
    );
};