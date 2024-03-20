import { Card, CardBody, CardHeader } from "@chakra-ui/react";
import { IWorkspaceInfo } from "@structurizr/y-workspace";
import { FC, useCallback } from "react";
import {
    ThumbnailContainer,
    ThumbnailSelector,
    WorkspaceCardActionBar,
    WorkspaceCardHeader
} from "../components";

export const WorkspaceTemplateCard: FC<{
    workspace: IWorkspaceInfo;
    isBookmarked?: boolean;
    isLiked?: boolean;
    onClick?: () => void;
    onTryItClick?: () => void;
    onBookmarkClick?: () => void;
    onLikeClick?: () => void;
}> = ({
    workspace,
    isBookmarked,
    isLiked,
    onClick,
    onTryItClick,
    onBookmarkClick,
    onLikeClick
}) => {
    const handleOnTryItClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onTryItClick?.();
    }, [onTryItClick]);

    const handleOnBookmarkClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onBookmarkClick?.();
    }, [onBookmarkClick]);

    const handleOnLikeClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onLikeClick?.();
    }, [onLikeClick]);

    return (
        <Card data-group>
            <CardHeader>
                <WorkspaceCardHeader
                    name={workspace.name}
                    createdBy={workspace.createdBy}
                    usedCount={workspace.statistics?.used ?? 0}
                    likedCount={workspace.statistics?.liked ?? 0}
                />
            </CardHeader>
            <CardBody>
                <ThumbnailContainer onClick={onClick}>
                    <ThumbnailSelector data={workspace} />
                </ThumbnailContainer>
                <WorkspaceCardActionBar
                    isBookmarked={isBookmarked}
                    isLiked={isLiked}
                    onTryItClick={handleOnTryItClick}
                    onBookmarkClick={handleOnBookmarkClick}
                    onLikeClick={handleOnLikeClick}
                />
            </CardBody>
        </Card>
    )
}