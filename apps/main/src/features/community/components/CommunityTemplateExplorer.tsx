import { useBreakpointValue } from "@chakra-ui/react";
import { useLocale } from "@restruct/ui";
import { IWorkspaceInfo, WorkspaceInfo } from "@structurizr/y-workspace";
import { EmojiSad, Folder } from "iconoir-react";
import { FC, useCallback, useEffect, useState } from "react";
import {
    CommunityApi,
    ErrorBoundary,
    LoadingMessage,
    LocaleKeys,
    StateMessage,
    useLoaderState,
    useSnackbar,
    useWorkspaceExplorer,
    WorkspaceGrid,
    WorkspaceTemplateCard
} from "../../../features";

export const CommunityTemplateExplorer: FC<{
    filters?: { category?: string, tag?: string };
    onClick?: (workspace: IWorkspaceInfo) => void;
    onTryIt?: (workspace: IWorkspaceInfo) => void;
    onBookmark?: (workspace: IWorkspaceInfo) => void;
    onLike?: (workspace: IWorkspaceInfo) => void;
}> = ({
    filters,
    onClick,
    onTryIt,
    onBookmark,
    onLike
}) => {
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4, "2xl": 5 });
    const { getLocalizedString } = useLocale();
    const { snackbar } = useSnackbar();
    
    const [ error, setError ] = useState<{ title: string, description: string } | undefined>();
    const [ isLoading, onStartLoading, onStopLoading ] = useLoaderState({ isLoading: true });
    const [ workspaces, setWorkspaces ] = useState<Array<IWorkspaceInfo>>([]);
    const { bookmarkedIds, likedIds, bookmark, unbookmark, like, unlike } = useWorkspaceExplorer();

    useEffect(() => {
        const communityApi = new CommunityApi();
        const controller = new AbortController();
        onStartLoading();

        communityApi.getWorkspaces({ ...filters }, { controller })
            .then(workspaces => {
                onStopLoading();
                setWorkspaces(workspaces ?? []);
            })
            .catch(error => {
                onStopLoading();
                setError({
                    title: getLocalizedString(LocaleKeys.ERROR_LOADING_TEMPLTES_TITLE),
                    description: getLocalizedString(LocaleKeys.ERROR_LOADING_TEMPLTES_DESCRIPTION)
                })
                snackbar({
                    title: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES_TITLE),
                    description: getLocalizedString(LocaleKeys.ERROR_LOADING_WORKSPACES_DESCRIPTION),
                    status: "error"
                })
            });

        return () => {
            controller.abort();
        }
    }, [filters, getLocalizedString, onStartLoading, onStopLoading, snackbar]);

    const handleOnBookmarkClick = useCallback((workspace: IWorkspaceInfo) => {
        bookmarkedIds.includes(workspace.workspaceId)
            ? unbookmark(workspace.workspaceId)
            : bookmark(workspace.workspaceId);
        onBookmark?.(workspace);
    }, [bookmarkedIds, unbookmark, bookmark, onBookmark]);

    const handleOnLikeClick = useCallback((workspace: IWorkspaceInfo) => {
        likedIds.includes(workspace.workspaceId)
            ? unlike(workspace.workspaceId)
            : like(workspace.workspaceId);
        onLike?.(workspace);
    }, [likedIds, unlike, like, onLike]);

    return (
        <ErrorBoundary fallback={<StateMessage icon={EmojiSad} {...error} />}>
            {isLoading && (
                <LoadingMessage
                    title={getLocalizedString(LocaleKeys.LOADING_TEMPLATES_TITLE)}
                    description={getLocalizedString(LocaleKeys.LOADING_TEMPLATES_DESCRIPTION)}
                />
            )}
            {!isLoading && (
                <WorkspaceGrid gridColumns={gridColumns}>
                    {workspaces.map((workspace) => (
                        <WorkspaceTemplateCard
                            key={workspace.workspaceId}
                            workspace={workspace}
                            isBookmarked={bookmarkedIds.includes(workspace.workspaceId)}
                            isLiked={likedIds.includes(workspace.workspaceId)}
                            onClick={() => onClick?.(workspace)}
                            onTryItClick={() => onTryIt?.(workspace)}
                            onBookmarkClick={() => handleOnBookmarkClick?.(workspace)}
                            onLikeClick={() => handleOnLikeClick?.(workspace)}
                        />
                    ))}
                </WorkspaceGrid>
            )}
            {!isLoading && workspaces.length === 0 && (
                <StateMessage
                    icon={Folder}
                    title={getLocalizedString(LocaleKeys.NO_COMMUNITY_WORKSPACES_TITLE)}
                    description={getLocalizedString(LocaleKeys.NO_COMMUNITY_WORKSPACES_SUGGESTION)}
                />
            )}
        </ErrorBoundary>
    )
}