import {
    ErrorBoundary,
    ErrorMessage,
    NoContentBoundary,
    NoContentMessage,
} from "@reversearchitecture/ui";
import { FC, useCallback } from "react";
import { CommunityCardView } from ".";
import { useWorkspaceCollection, WorkspaceInfo } from "../..";

export const CommunityTemplateExplorer: FC<{
    workspaces: WorkspaceInfo[];
    empty?: {
        title?: string;
        description?: string;
        action?: React.ReactElement;
    },
    error?: {
        title?: string;
        description?: string;
        action?: React.ReactElement;
    },
    onClick?: (workspace: WorkspaceInfo) => void;
    onTryIt?: (workspace: WorkspaceInfo) => void;
    onBookmark?: (workspace: WorkspaceInfo) => void;
    onLike?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    empty,
    error,
    onClick,
    onTryIt,
}) => {
    const { bookmarkedIds, likedIds, bookmark, unbookmark, like, unlike } = useWorkspaceCollection();

    const handleOnBookmarkClick = useCallback((workspace: WorkspaceInfo) => {
        bookmarkedIds.includes(workspace.workspaceId)
            ? unbookmark(workspace.workspaceId)
            : bookmark(workspace.workspaceId);
    }, [bookmarkedIds, bookmark, unbookmark]);

    const handleOnLikeClick = useCallback((workspace: WorkspaceInfo) => {
        likedIds.includes(workspace.workspaceId)
            ? unlike(workspace.workspaceId)
            : like(workspace.workspaceId);
    }, [likedIds, like, unlike]);

    return (
        <ErrorBoundary
            fallback={(
                <ErrorMessage
                    errorTitle={error?.title}
                    errorDescription={error?.description}
                />
            )}
        >
            <NoContentBoundary
                condition={workspaces.length === 0}
                fallback={(
                    <NoContentMessage
                        actionTitle={empty?.title}
                        actionDescription={empty?.description}
                    />
                )}
            >
                <CommunityCardView
                    workspaces={workspaces}
                    onClick={onClick}
                    onTryItClick={onTryIt}
                    onBookmarkClick={handleOnBookmarkClick}
                    onLikeClick={handleOnLikeClick}
                />
            </NoContentBoundary>
        </ErrorBoundary>
    )
}