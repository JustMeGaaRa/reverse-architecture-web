import { Flex, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { applyMetadata, applyTheme, Workspace, WorkspaceMetadata } from "@structurizr/dsl";
import { useStructurizrParser } from "@structurizr/react";
import { useWorkspaceTheme, WorkspaceProvider } from "@workspace/core";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import {
    CommentApi,
    CommentThread,
    TemplateOverview,
    useAccount,
    WorkspaceApi,
    WorkspaceInfo
} from "../../../features";

export const CommunityTemplateModal: FC<{
    workspaceId: string;
    isOpen: boolean;
    onTryItClick?: (workspace: WorkspaceInfo) => void;
    onClose: () => void;
}> = ({
    workspaceId,
    isOpen,
    onTryItClick,
    onClose,
}) => {
    // TODO: come up with a convention or a way to identify the main thread discussion
    const discussionThreadId = "workspace-discussion";
    const { parseStructurizr } = useStructurizrParser();
    const { theme } = useWorkspaceTheme();
    const { account } = useAccount();
    const [ info, setInfo ] = useState<WorkspaceInfo>();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty.toObject());
    const [ metadata, setMetadata ] = useState(WorkspaceMetadata.Empty.toObject());
    const [ commentThread, setCommentThread ] = useState<CommentThread>();
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const { commentApi } = useMemo(() => ({ commentApi: new CommentApi() }), []);

    useEffect(() => {
        workspaceApi.getWorkspaceById(workspaceId)
            .then(info => {
                const builder = parseStructurizr(info.content?.text);
                const workspaceObject = applyMetadata(applyTheme(builder.toObject(), info.content?.theme ?? theme), info.content?.metadata);
                setInfo(info);
                setWorkspace(workspaceObject);
                setMetadata(info.content?.metadata);
            })
            .catch(error => console.error(error));
    }, [workspaceId, parseStructurizr, theme, workspaceApi, commentApi]);

    const handleOnInformationClick = useCallback(() => {

    }, []);

    const handleOnCommentsClick = useCallback(() => {
        commentApi.getCommentThreadById(workspaceId, discussionThreadId)
            .then(comments => setCommentThread(comments))
            .catch(error => console.error(error));
    }, [workspaceId, commentApi]);

    const handleOnCommentSend = useCallback((comment: string) => {
        const commentInfo = {
            commentId: v4(),
            commentThreadId: discussionThreadId,
            author: account.fullname,
            text: comment,
            createdDate: new Date().toDateString(),
        }
        commentApi.saveCommentThreadReply(workspaceId, discussionThreadId, commentInfo);
    }, [workspaceId, account, commentApi]);

    const handleOnTryItClick = useCallback(() => {
        onTryItClick(info);
    }, [info, onTryItClick]);

    return (
        <WorkspaceProvider workspace={Workspace.Empty}>
            <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Flex
                        bottom={0}
                        paddingX={8}
                        paddingTop={20}
                        height={"100%"}
                        width={"100%"}
                        position={"absolute"}
                    >
                        <TemplateOverview
                            information={info}
                            workspace={workspace}
                            metadata={metadata}
                            discussion={commentThread}
                            onInformationClick={handleOnInformationClick}
                            onCommentsClick={handleOnCommentsClick}
                            onCommentSend={handleOnCommentSend}
                            onTryItClick={handleOnTryItClick}
                            onClose={onClose}
                        />
                    </Flex>
                </ModalContent>
            </Modal>
        </WorkspaceProvider>
    )
}