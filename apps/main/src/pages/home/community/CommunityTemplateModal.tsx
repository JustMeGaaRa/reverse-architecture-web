import { Flex, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useStructurizrParser, Workspace } from "structurizr";
import { v4 } from "uuid";
import {
    CommentApi,
    CommentThread,
    CommunityApi,
    TemplateOverview,
    useAccount,
    useSnackbar,
    useWorkspaceCollection,
    WorkspaceInfo
} from "../../../features";

// TODO: come up with a convention or a way to identify the main thread discussion
const discussionThreadId = "workspace-discussion";

export const CommunityTemplateModal: FC<{
    workspaceId: string;
    isOpen: boolean;
    onClose: () => void;
}> = ({
    workspaceId,
    isOpen,
    onClose
}) => {
    const { account } = useAccount();
    const { snackbar } = useSnackbar();
    const { bookmarkedIds, likedIds, bookmark, unbookmark, like, unlike } = useWorkspaceCollection();

    const communityApi = useMemo(() => new CommunityApi(), []);
    const [ information, setInformation ] = useState<WorkspaceInfo>();
    const [ template, setTemplate ] = useState(Workspace.Empty);
    const { parseStructurizr } = useStructurizrParser();

    const commentApi = useMemo(() => new CommentApi(), []);
    const [ discussion, setDiscussion ] = useState<CommentThread>(undefined);

    useEffect(() => {
        const loadTemplate = async () => {
            const information = await communityApi.getWorkspaceById(workspaceId);
            const structurizrText = await communityApi.getWorkspaceContent(workspaceId);
            const metadata = await communityApi.getWorkspaceMetadata(workspaceId)

            const template = parseStructurizr(structurizrText);
            const autolayoutWorkspace = template.applyMetadata(metadata);

            setInformation(information);
            setTemplate(autolayoutWorkspace);
        }

        const loadComments = async () => {
            const comments = await commentApi.getBiscussionById(workspaceId, discussionThreadId);
            setDiscussion(comments);
        }

        if (workspaceId) {
            loadTemplate()
                .catch(error => {
                    snackbar({
                        title: error.message,
                        description: error.message,
                        status: "error",
                        duration: 9000,
                    })
                })
            loadComments()
                .catch(error => {
                    snackbar({
                        title: error.message,
                        description: error.message,
                        status: "error",
                        duration: 9000,
                    })
                })
        }

        return () => {
            setInformation(undefined);
            setTemplate(Workspace.Empty);
            setDiscussion(undefined);
        }
    }, [workspaceId, communityApi, commentApi, snackbar, parseStructurizr, setTemplate, setDiscussion]);

    const handleOnWorkspaceBookmark = useCallback(() => {
        bookmarkedIds.includes(workspaceId)
            ? unbookmark(workspaceId)
            : bookmark(workspaceId);
    }, [workspaceId, bookmarkedIds, bookmark, unbookmark]);

    const handleOnWorkspaceLike = useCallback(() => {
        likedIds.includes(workspaceId)
            ? unlike(workspaceId)
            : like(workspaceId);
    }, [workspaceId, likedIds, like, unlike]);

    const handleOnWorskapceTryOut = useCallback(() => {

    }, []);

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
    }, [workspaceId, account.fullname, commentApi]);

    return (        
        <Modal
            isOpen={isOpen}
            size={"full"}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <Flex
                    bottom={0}
                    paddingTop={20}
                    paddingX={8}
                    position={"absolute"}
                    height={"100%"}
                    width={"100%"}
                >
                    <TemplateOverview
                        information={information}
                        workspace={template}
                        comments={discussion}
                        isBookmarked={bookmarkedIds.includes(information?.workspaceId)}
                        isLiked={likedIds.includes(information?.workspaceId)}
                        onBookmark={handleOnWorkspaceBookmark}
                        onLike={handleOnWorkspaceLike}
                        onCommentSend={handleOnCommentSend}
                        onTryItClick={handleOnWorskapceTryOut}
                        onClose={onClose}
                    />
                </Flex>
            </ModalContent>
        </Modal>
    )
}