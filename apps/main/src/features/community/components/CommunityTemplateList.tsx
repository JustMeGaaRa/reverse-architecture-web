import { Box } from "@chakra-ui/react";
// TODO: consider making this component/feature less dependent on the workspace-viewer package
import { EmptyContent } from "@reversearchitecture/ui";
import { Folder } from "iconoir-react";
import { FC } from "react";
import { CommunityCardView } from "../components";
import { WorkspaceInfo } from "../../";

export const CommunityTemplateList: FC<{
    workspaces: WorkspaceInfo[];
    emptyTitle?: string;
    emptyDescription?: string;
    onClick?: (workspace: WorkspaceInfo) => void;
    onTryItClick?: (workspace: WorkspaceInfo) => void;
    onBookmarkClick?: (workspace: WorkspaceInfo) => void;
    onLikeClick?: (workspace: WorkspaceInfo) => void;
}> = ({
    workspaces,
    emptyTitle,
    emptyDescription,
    onClick,
    onTryItClick,
    onBookmarkClick,
    onLikeClick
}) => {
    return (
        <>
            {workspaces.length === 0 && (
                <EmptyContent
                    icon={Folder}
                    title={emptyTitle}
                    description={emptyDescription}
                />
            )}
            {workspaces.length > 0 && (
                <CommunityCardView
                    workspaces={workspaces}
                    onClick={onClick}
                    onTryItClick={onTryItClick}
                    onBookmarkClick={onBookmarkClick}
                    onLikeClick={onLikeClick}
                />
            )}
        </>
    )
}