import { Flex, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { IViewDefinition, ViewType, Workspace } from "@structurizr/dsl";
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
    const { account } = useAccount();
    const [ info, setInfo ] = useState<WorkspaceInfo>();
    const { theme } = useWorkspaceTheme();
    const [ workspace, setWorkspace ] = useState(Workspace.Empty);
    const [ discussion, setDiscussion ] = useState<CommentThread>();
    const { workspaceApi } = useMemo(() => ({ workspaceApi: new WorkspaceApi() }), []);
    const { commentApi } = useMemo(() => ({ commentApi: new CommentApi() }), []);

    useEffect(() => {
        if (workspaceId) {
            workspaceApi.getWorkspaceById(workspaceId)
                .then(info => {
                    const parsedWorkspace = parseStructurizr(info.content?.text);
                    const autolayoutWorkspace = parsedWorkspace.applyMetadata(info.content?.metadata);
                    setInfo(info);
                    setWorkspace(autolayoutWorkspace);
                })
                .catch(error => console.error(error));
        }

        return () => {
            setInfo(undefined);
            setWorkspace(Workspace.Empty);
        }
    }, [workspaceId, parseStructurizr, theme, workspaceApi, commentApi]);

    const handleOnInformationClick = useCallback(() => {

    }, []);

    const handleOnCommentsClick = useCallback(() => {
        if (workspaceId) {
            commentApi.getBiscussionById(workspaceId, discussionThreadId)
                .then(comments => setDiscussion(comments))
                .catch(error => console.error(error));
        }
    }, [workspaceId, commentApi]);

    const handleOnCommentSend = useCallback((comment: string) => {
        if (workspaceId) {
            const commentInfo = {
                commentId: v4(),
                commentThreadId: discussionThreadId,
                author: account.fullname,
                text: comment,
                createdDate: new Date().toDateString(),
            }
            commentApi.saveDiscussionReply(workspaceId, discussionThreadId, commentInfo)
                .then(comments => setDiscussion(comments))
                .catch(error => console.error(error));
        }
    }, [workspaceId, account, commentApi]);

    const handleOnTryItClick = useCallback(() => {
        onTryItClick(info);
    }, [info, onTryItClick]);

    return (
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
                        discussion={discussion}
                        onCommentSend={handleOnCommentSend}
                        onTryItClick={handleOnTryItClick}
                        onInformationClick={handleOnInformationClick}
                        onCommentsClick={handleOnCommentsClick}
                        onClose={onClose}
                    />
                </Flex>
            </ModalContent>
        </Modal>
    )
}