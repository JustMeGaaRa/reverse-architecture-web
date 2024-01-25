import {
    ErrorBoundary,
    ErrorMessage,
    NoContentBoundary,
    NoContentMessage,
    useLocale
} from "@reversearchitecture/ui";
import { FC, useCallback } from "react";
import { CommunityCardView } from ".";
import { LocaleKeys, useWorkspaceCollection, WorkspaceInfo } from "../..";

export const CommunityTemplateCollection: FC<{
    workspaces: WorkspaceInfo[];
    emptyTitle?: string;
    emptyDescription?: string;
    onClick?: (workspace: WorkspaceInfo) => void;
    onTryIt?: (workspace: WorkspaceInfo) => void;
    onBookmark?: (workspace: WorkspaceInfo) => void;
    onLike?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    emptyTitle,
    emptyDescription,
    onClick,
    onTryIt,
}) => {
    const { getLocalizedString } = useLocale();
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
                    errorDescription={getLocalizedString(LocaleKeys.ERROR_LOADING_TEMPLTES)}
                />
            )}
        >
            <NoContentBoundary
                condition={workspaces.length === 0}
                fallback={(
                    <NoContentMessage
                        actionDescription={emptyDescription}
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